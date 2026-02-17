import { ArrowRightIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import environmentsSectionStyles from './environments-section.styles';
import useEnvironmentsSection from './useEnvironmentsSection';
import { BsBox, BsButton, BsInput, BsText } from '@/components/singles/BaseComponents';

type EnvironmentsSectionProps = {
  environments: string[];
  selectedSystem: string | null;
  selectedEnvironment: string | null;
  onEnter: (environment: string) => void | Promise<void>;
  onCreate: (environment: string) => void | Promise<void>;
  onDelete: (environment: string) => void | Promise<void>;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
};

export function EnvironmentsSection({
  environments,
  selectedSystem,
  selectedEnvironment,
  onEnter,
  onCreate,
  onDelete,
  loading,
  creating,
  deleting,
}: EnvironmentsSectionProps) {
  const { newEnvironment, setNewEnvironment, canCreate, handleCreate } = useEnvironmentsSection({ onCreate });

  return (
    <BsBox className={environmentsSectionStyles.containerTC}>
      <BsBox className={environmentsSectionStyles.headerTC}>
        <BsText className={environmentsSectionStyles.titleTC}>Ambientes</BsText>
        <BsText className={environmentsSectionStyles.subtitleTC}>
          {selectedSystem ? `Sistema: ${selectedSystem}` : 'Selecione um sistema primeiro.'}
        </BsText>
      </BsBox>

      <BsBox className={environmentsSectionStyles.createRowTC}>
        <BsInput
          value={newEnvironment}
          onChange={(event) => setNewEnvironment(event.target.value)}
          placeholder='novo-ambiente'
          className={environmentsSectionStyles.createInputTC}
          disabled={!selectedSystem || creating}
        />
        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={() => void handleCreate()}
          buttonProps={{ disabled: !selectedSystem || !canCreate || creating }}
          className={environmentsSectionStyles.createButtonTC}
        >
          <PlusIcon size={12} /> Criar
        </BsButton>
      </BsBox>

      <BsBox className={environmentsSectionStyles.listTC}>
        {loading && <BsBox className={environmentsSectionStyles.emptyTC}>Carregando...</BsBox>}

        {!loading && !selectedSystem && <BsBox className={environmentsSectionStyles.emptyTC}>Sem sistema selecionado.</BsBox>}

        {!loading && selectedSystem && environments.length === 0 && (
          <BsBox className={environmentsSectionStyles.emptyTC}>Nenhum ambiente.</BsBox>
        )}

        {!loading &&
          environments.map((environment) => (
            <BsBox key={environment} className={environmentsSectionStyles.itemRowTC}>
              <BsButton
                type='button'
                variants={{ variant: 'ghost' }}
                onClick={() => void onEnter(environment)}
                className={
                  selectedEnvironment === environment
                    ? environmentsSectionStyles.itemButtonActiveTC
                    : environmentsSectionStyles.itemButtonTC
                }
              >
                <ArrowRightIcon size={12} /> {environment}
              </BsButton>
              <BsButton
                type='button'
                variants={{ variant: 'outline' }}
                onClick={() => {
                  if (window.confirm(`Excluir ambiente "${environment}"?`)) {
                    void onDelete(environment);
                  }
                }}
                buttonProps={{ disabled: deleting }}
                className={environmentsSectionStyles.deleteButtonTC}
              >
                <Trash2Icon size={12} />
              </BsButton>
            </BsBox>
          ))}
      </BsBox>
    </BsBox>
  );
}

