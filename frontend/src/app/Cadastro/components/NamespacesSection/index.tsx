import { ArrowRightIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import namespacesSectionStyles from './namespaces-section.styles';
import useNamespacesSection from './useNamespacesSection';
import { BsBox, BsButton, BsInput, BsText } from '@/components/singles/BaseComponents';
import { envConfig } from '@/envConfig';

type NamespacesSectionProps = {
  namespaces: string[];
  selectedSystem: string | null;
  selectedEnvironment: string | null;
  selectedLanguage: string | null;
  onOpen: (namespace: string) => void;
  onCreate: (namespace: string) => void | Promise<void>;
  onDelete: (namespace: string) => void | Promise<void>;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
};

export function NamespacesSection(props: NamespacesSectionProps) {
  const { namespaces, selectedSystem, selectedEnvironment, selectedLanguage } = props;
  const { onOpen, onCreate, onDelete } = props;
  const { loading, creating, deleting } = props;

  const { newNamespace, setNewNamespace, canCreate, handleCreate } = useNamespacesSection({ onCreate });

  const canMutate = Boolean(selectedSystem && selectedEnvironment && selectedLanguage);
  const canCreateOnCurrentEnvironment = canMutate && selectedEnvironment === envConfig.devEnvironment;
  const canDeleteOnCurrentEnvironment = canMutate && selectedEnvironment === envConfig.devEnvironment;

  return (
    <BsBox className={namespacesSectionStyles.containerTC}>
      <BsBox className={namespacesSectionStyles.headerTC}>
        <BsText className={namespacesSectionStyles.titleTC}>Namespaces</BsText>
        <BsText className={namespacesSectionStyles.subtitleTC}>
          {!canMutate
            ? 'Selecione um idioma primeiro.'
            : selectedEnvironment !== envConfig.devEnvironment
              ? 'Criação permitida apenas no ambiente dev.'
              : 'Clique para abrir a tela de traducoes.'}
        </BsText>
      </BsBox>

      <BsBox className={namespacesSectionStyles.createRowTC}>
        <BsInput
          value={newNamespace}
          onChange={(event) => setNewNamespace(event.target.value)}
          placeholder='novo-namespace'
          className={namespacesSectionStyles.createInputTC}
          disabled={!canCreateOnCurrentEnvironment || creating}
        />
        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={() => void handleCreate()}
          buttonProps={{ disabled: !canCreateOnCurrentEnvironment || !canCreate || creating }}
          className={namespacesSectionStyles.createButtonTC}
        >
          <PlusIcon size={12} /> Criar
        </BsButton>
      </BsBox>

      <BsBox className={namespacesSectionStyles.listTC}>
        {loading && <BsBox className={namespacesSectionStyles.emptyTC}>Carregando...</BsBox>}

        {!loading && !canMutate && <BsBox className={namespacesSectionStyles.emptyTC}>Sem idioma selecionado.</BsBox>}

        {!loading && canMutate && namespaces.length === 0 && (
          <BsBox className={namespacesSectionStyles.emptyTC}>Nenhum namespace.</BsBox>
        )}

        {!loading &&
          namespaces.map((namespace) => (
            <BsBox key={namespace} className={namespacesSectionStyles.itemRowTC}>
              <BsButton
                type='button'
                variants={{ variant: 'ghost' }}
                onClick={() => onOpen(namespace)}
                className={namespacesSectionStyles.openButtonTC}
              >
                <ArrowRightIcon size={12} /> {namespace}
              </BsButton>
              <BsButton
                type='button'
                variants={{ variant: 'outline' }}
                onClick={() => {
                  if (window.confirm(`Excluir namespace "${namespace}"?`)) {
                    void onDelete(namespace);
                  }
                }}
                buttonProps={{ disabled: deleting || !canDeleteOnCurrentEnvironment }}
                className={namespacesSectionStyles.deleteButtonTC}
              >
                <Trash2Icon size={12} />
              </BsButton>
            </BsBox>
          ))}
      </BsBox>
    </BsBox>
  );
}
