import { dashboardStyles } from './dashboard.styles';
import { useDashboard } from './useDashboard';
import { BsBox, BsButton } from '@/components/singles/BaseComponents';
import { Modal } from '@/components/singles/Modal/Modal';
import type {
  EnvironmentDiagnostic,
  LanguageDiagnostic,
  NamespaceDiagnostic,
  SystemDiagnostic,
} from '@/services/generated/models';

function Dashboard() {
  const {
    overview,
    loading,
    error,
    fetchOverview,
    currentLevel,
    currentItems,
    breadcrumbs,
    selectItem,
    goToLevel,
    selectedNamespace,
    closeNamespaceModal,
  } = useDashboard();

  const titleByLevel = {
    systems: 'Systems',
    environments: 'Environments',
    languages: 'Languages',
    namespaces: 'Namespaces',
  } as const;

  if (loading) {
    return <BsBox className={dashboardStyles.emptyTC}>Carregando overview de traducoes...</BsBox>;
  }

  return (
    <BsBox className={dashboardStyles.pageTC}>
      <BsBox className={dashboardStyles.headerTC}>
        <BsBox className={dashboardStyles.titleTC}>Translation Dashboard</BsBox>
        <BsBox className={dashboardStyles.subtitleTC}>
          Explore o status por hierarquia: system, environment, language e namespace.
        </BsBox>
      </BsBox>

      {error && (
        <BsBox className={dashboardStyles.errorTC}>
          <BsBox>{error}</BsBox>
          <BsButton type='button' onClick={fetchOverview} variants={{ variant: 'outline', size: 'sm' }}>
            Tentar novamente
          </BsButton>
        </BsBox>
      )}

      {overview && (
        <BsBox className={dashboardStyles.summaryGridTC}>
          <SummaryCard label='Systems' value={overview.totals.systems} />
          <SummaryCard label='Environments' value={overview.totals.environments} />
          <SummaryCard label='Languages' value={overview.totals.languages} />
          <SummaryCard label='Namespaces' value={overview.totals.namespaces} />
        </BsBox>
      )}

      <BsBox className={dashboardStyles.toolbarTC}>
        {breadcrumbs.map((crumb) => (
          <BsButton
            key={`${crumb.level}-${crumb.label}`}
            type='button'
            variants={{ variant: 'outline', size: 'sm' }}
            onClick={() => goToLevel(crumb.level)}
            className={dashboardStyles.crumbButtonTC}
          >
            {crumb.label}
          </BsButton>
        ))}
      </BsBox>

      <BsBox className={dashboardStyles.subtitleTC}>{`Nivel atual: ${titleByLevel[currentLevel]}`}</BsBox>

      {currentItems.length === 0 ? (
        <BsBox className={dashboardStyles.emptyTC}>Sem dados para este nivel.</BsBox>
      ) : (
        <BsBox className={dashboardStyles.cardsGridTC}>
          {currentItems.map((item) => (
            <CardItem
              key={getItemKey(item, currentLevel)}
              item={item}
              level={currentLevel}
              onClick={() => selectItem(item, currentLevel)}
            />
          ))}
        </BsBox>
      )}

      <Modal isOpen={!!selectedNamespace} onClose={closeNamespaceModal}>
        <BsBox className={dashboardStyles.modalCardTC}>
          <BsBox className={dashboardStyles.modalTitleTC}>{selectedNamespace?.namespace}</BsBox>
          <BsBox
            className={dashboardStyles.modalMetaTC}
          >{`Total de termos: ${selectedNamespace?.totalTerms ?? 0}`}</BsBox>
          <BsBox
            className={dashboardStyles.modalMetaTC}
          >{`Traduzidos: ${selectedNamespace?.translatedTerms ?? 0}`}</BsBox>
          <BsBox className={dashboardStyles.modalMetaTC}>{`Faltando: ${selectedNamespace?.missingTerms ?? 0}`}</BsBox>
          <BsBox
            className={dashboardStyles.modalMetaTC}
          >{`Percentual: ${selectedNamespace?.translatedPercentage ?? 0}%`}</BsBox>
          <BsBox className={dashboardStyles.modalActionsTC}>
            <BsButton type='button' variants={{ variant: 'default' }} onClick={closeNamespaceModal}>
              Fechar
            </BsButton>
          </BsBox>
        </BsBox>
      </Modal>
    </BsBox>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <BsBox className={dashboardStyles.statCardTC}>
      <BsBox className={dashboardStyles.statLabelTC}>{label}</BsBox>
      <BsBox className={dashboardStyles.statValueTC}>{value}</BsBox>
    </BsBox>
  );
}

function CardItem({
  item,
  level,
  onClick,
}: {
  item: SystemDiagnostic | EnvironmentDiagnostic | LanguageDiagnostic | NamespaceDiagnostic;
  level: 'systems' | 'environments' | 'languages' | 'namespaces';
  onClick: () => void;
}) {
  const title = getItemTitle(item, level);
  const percentage = item.translatedPercentage;
  const showBaseBadge = level === 'languages' && (item as LanguageDiagnostic).isBase;
  const percentageTone = getPercentageToneClasses(percentage);

  return (
    <BsButton
      type='button'
      variants={{ variant: 'outline' }}
      className={dashboardStyles.cardButtonTC}
      onClick={onClick}
    >
      <BsBox className={dashboardStyles.cardTitleRowTC}>
        <BsBox className={dashboardStyles.cardTitleTC}>{title}</BsBox>
        {showBaseBadge && <BsBox className={dashboardStyles.badgeTC}>Base</BsBox>}
      </BsBox>

      <BsBox className={dashboardStyles.cardMetaTC}>
        <BsBox>{`Total: ${item.totalTerms}`}</BsBox>
        <BsBox>{`Traduzidos: ${item.translatedTerms}`}</BsBox>
        <BsBox>{`Faltando: ${item.missingTerms}`}</BsBox>
      </BsBox>

      <BsBox className={dashboardStyles.progressWrapTC}>
        <BsBox className={dashboardStyles.progressTrackTC}>
          <BsBox
            className={`${dashboardStyles.progressFillTC} ${percentageTone.fillTC}`}
            elementProps={{ style: { width: `${percentage}%` } }}
          />
        </BsBox>
        <BsBox className={`${dashboardStyles.progressTextTC} ${percentageTone.textTC}`}>{`${percentage}%`}</BsBox>
      </BsBox>
    </BsButton>
  );
}

function getItemTitle(
  item: SystemDiagnostic | EnvironmentDiagnostic | LanguageDiagnostic | NamespaceDiagnostic,
  level: 'systems' | 'environments' | 'languages' | 'namespaces',
) {
  if (level === 'systems') return (item as SystemDiagnostic).system;
  if (level === 'environments') return (item as EnvironmentDiagnostic).environment;
  if (level === 'languages') return (item as LanguageDiagnostic).language;
  return (item as NamespaceDiagnostic).namespace;
}

function getItemKey(
  item: SystemDiagnostic | EnvironmentDiagnostic | LanguageDiagnostic | NamespaceDiagnostic,
  level: 'systems' | 'environments' | 'languages' | 'namespaces',
) {
  if (level === 'systems') return `system-${(item as SystemDiagnostic).system}`;
  if (level === 'environments') return `environment-${(item as EnvironmentDiagnostic).environment}`;
  if (level === 'languages') return `language-${(item as LanguageDiagnostic).language}`;
  return `namespace-${(item as NamespaceDiagnostic).namespace}`;
}

function getPercentageToneClasses(percentage: number) {
  if (percentage < 50) {
    return {
      fillTC: dashboardStyles.progressFillLowTC,
      textTC: dashboardStyles.progressTextLowTC,
    };
  }

  if (percentage <= 90) {
    return {
      fillTC: dashboardStyles.progressFillMediumTC,
      textTC: dashboardStyles.progressTextMediumTC,
    };
  }

  return {
    fillTC: dashboardStyles.progressFillHighTC,
    textTC: dashboardStyles.progressTextHighTC,
  };
}

export default Dashboard;
