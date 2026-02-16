import { dashboardStyles } from './dashboard.styles';
import { useDashboard } from './useDashboard';
import { BsBox, BsButton, BsInput } from '@/components/singles/BaseComponents';
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
    namespaceRows,
    namespaceLoading,
    namespaceError,
    namespaceSaving,
    namespaceSaveInfo,
    changedNamespaceRows,
    updateNamespaceValue,
    saveNamespaceChanges,
    closeNamespaceEditor,
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
              onClick={() => void selectItem(item, currentLevel)}
            />
          ))}
        </BsBox>
      )}

      {selectedNamespace && (
        <BsBox className={dashboardStyles.namespacePanelTC}>
          <BsBox className={dashboardStyles.namespaceHeaderTC}>
            <BsBox className={dashboardStyles.namespaceTitleTC}>{`Namespace: ${selectedNamespace.namespace}`}</BsBox>
            <BsBox className={dashboardStyles.namespaceSubtitleTC}>
              Chave / Valor Considerado (fallback) / Traducao Propria (clean)
            </BsBox>
          </BsBox>

          <BsBox className={dashboardStyles.namespaceToolbarTC}>
            <BsBox className={dashboardStyles.namespaceChangedTC}>
              {`${changedNamespaceRows.length} alteracao(oes) pendente(s)`}
            </BsBox>
            <BsBox className='flex gap-2'>
              <BsButton type='button' variants={{ variant: 'outline', size: 'sm' }} onClick={closeNamespaceEditor}>
                Fechar
              </BsButton>
              <BsButton
                type='button'
                variants={{ variant: 'default', size: 'sm' }}
                onClick={saveNamespaceChanges}
                buttonProps={{ disabled: changedNamespaceRows.length === 0 || namespaceSaving || namespaceLoading }}
              >
                {namespaceSaving ? 'Salvando...' : 'Salvar alteracoes'}
              </BsButton>
            </BsBox>
          </BsBox>

          {namespaceSaveInfo && <BsBox className={dashboardStyles.saveInfoTC}>{namespaceSaveInfo}</BsBox>}

          {namespaceError && <BsBox className={dashboardStyles.errorTC}>{namespaceError}</BsBox>}

          {namespaceLoading ? (
            <BsBox className={dashboardStyles.emptyTC}>Carregando dados do namespace...</BsBox>
          ) : namespaceRows.length === 0 ? (
            <BsBox className={dashboardStyles.emptyTC}>Sem chaves para este namespace.</BsBox>
          ) : (
            <BsBox className={dashboardStyles.tableWrapTC}>
              <table className={dashboardStyles.tableTC}>
                <thead>
                  <tr className={dashboardStyles.tableHeadRowTC}>
                    <th className={dashboardStyles.tableHeadCellTC}>Chave</th>
                    <th className={dashboardStyles.tableHeadCellTC}>Valor Considerado</th>
                    <th className={dashboardStyles.tableHeadCellTC}>Traducao Propria</th>
                  </tr>
                </thead>
                <tbody>
                  {namespaceRows.map((row) => {
                    const isEmpty = row.ownValue.trim().length === 0;
                    return (
                      <tr key={row.key} className={dashboardStyles.tableRowTC}>
                        <td className={dashboardStyles.tableCellTC}>
                          <BsBox className={dashboardStyles.keyLabelTC}>{row.key}</BsBox>
                        </td>
                        <td className={dashboardStyles.tableCellTC}>
                          <BsBox className={dashboardStyles.valueLabelTC}>{row.consideredValue}</BsBox>
                        </td>
                        <td className={dashboardStyles.tableCellTC}>
                          <BsInput
                            value={row.ownValue}
                            className={`${dashboardStyles.inputTC} ${isEmpty ? dashboardStyles.inputInvalidTC : ''}`}
                            onChange={(e) => updateNamespaceValue(row.key, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </BsBox>
          )}
        </BsBox>
      )}
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
