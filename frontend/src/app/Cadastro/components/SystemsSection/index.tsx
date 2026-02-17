import { ArrowRightIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import systemsSectionStyles from './systems-section.styles';
import useSystemsSection from './useSystemsSection';
import { BsBox, BsButton, BsInput, BsText } from '@/components/singles/BaseComponents';

type SystemsSectionProps = {
  systems: string[];
  selectedSystem: string | null;
  onEnter: (system: string) => void | Promise<void>;
  onCreate: (system: string) => void | Promise<void>;
  onDelete: (system: string) => void | Promise<void>;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
};

export function SystemsSection({
  systems,
  selectedSystem,
  onEnter,
  onCreate,
  onDelete,
  loading,
  creating,
  deleting,
}: SystemsSectionProps) {
  const { newSystem, setNewSystem, canCreate, handleCreate } = useSystemsSection({ onCreate });

  return (
    <BsBox className={systemsSectionStyles.containerTC}>
      <BsBox className={systemsSectionStyles.headerTC}>
        <BsText className={systemsSectionStyles.titleTC}>Sistemas</BsText>
        <BsText className={systemsSectionStyles.subtitleTC}>Escolha um sistema para entrar nos ambientes.</BsText>
      </BsBox>

      <BsBox className={systemsSectionStyles.createRowTC}>
        <BsInput
          value={newSystem}
          onChange={(event) => setNewSystem(event.target.value)}
          placeholder='novo-sistema'
          className={systemsSectionStyles.createInputTC}
          disabled={creating}
        />
        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={() => void handleCreate()}
          buttonProps={{ disabled: !canCreate || creating }}
          className={systemsSectionStyles.createButtonTC}
        >
          <PlusIcon size={12} /> Criar
        </BsButton>
      </BsBox>

      <BsBox className={systemsSectionStyles.listTC}>
        {loading && <BsBox className={systemsSectionStyles.emptyTC}>Carregando...</BsBox>}

        {!loading && systems.length === 0 && <BsBox className={systemsSectionStyles.emptyTC}>Nenhum sistema.</BsBox>}

        {!loading &&
          systems.map((system) => (
            <BsBox key={system} className={systemsSectionStyles.itemRowTC}>
              <BsButton
                type='button'
                variants={{ variant: 'ghost' }}
                onClick={() => void onEnter(system)}
                className={
                  selectedSystem === system ? systemsSectionStyles.itemButtonActiveTC : systemsSectionStyles.itemButtonTC
                }
              >
                <ArrowRightIcon size={12} /> {system}
              </BsButton>
              <BsButton
                type='button'
                variants={{ variant: 'outline' }}
                onClick={() => {
                  if (window.confirm(`Excluir sistema "${system}"?`)) {
                    void onDelete(system);
                  }
                }}
                buttonProps={{ disabled: deleting }}
                className={systemsSectionStyles.deleteButtonTC}
              >
                <Trash2Icon size={12} />
              </BsButton>
            </BsBox>
          ))}
      </BsBox>
    </BsBox>
  );
}

