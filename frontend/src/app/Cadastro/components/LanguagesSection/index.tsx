import { ArrowRightIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import languagesSectionStyles from './languages-section.styles';
import useLanguagesSection from './useLanguagesSection';
import { BsBox, BsButton, BsInput, BsText } from '@/components/singles/BaseComponents';

type LanguagesSectionProps = {
  languages: string[];
  selectedSystem: string | null;
  selectedEnvironment: string | null;
  selectedLanguage: string | null;
  baseLanguage: string | null;
  onEnter: (language: string) => void | Promise<void>;
  onCreate: (language: string) => void | Promise<void>;
  onDelete: (language: string) => void | Promise<void>;
  onPromote: (language: string) => void | Promise<void>;
  onDemote: (language: string) => void | Promise<void>;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
  promoting: boolean;
  demoting: boolean;
};

export function LanguagesSection({
  languages,
  selectedSystem,
  selectedEnvironment,
  selectedLanguage,
  baseLanguage,
  onEnter,
  onCreate,
  onDelete,
  onPromote,
  onDemote,
  loading,
  creating,
  deleting,
  promoting,
  demoting,
}: LanguagesSectionProps) {
  const { newLanguage, setNewLanguage, canCreate, handleCreate } = useLanguagesSection({ onCreate });

  const canMutate = Boolean(selectedSystem && selectedEnvironment);
  const canCreateOnCurrentEnvironment = canMutate && selectedEnvironment === 'dev';
  const canDeleteOnCurrentEnvironment = canMutate && selectedEnvironment === 'dev';
  const canChangeBaseOnCurrentEnvironment = canMutate && selectedEnvironment === 'dev';

  return (
    <BsBox className={languagesSectionStyles.containerTC}>
      <BsBox className={languagesSectionStyles.headerTC}>
        <BsText className={languagesSectionStyles.titleTC}>Idiomas</BsText>
        <BsText className={languagesSectionStyles.subtitleTC}>
          {!canMutate
            ? 'Selecione um ambiente primeiro.'
            : selectedEnvironment !== 'dev'
              ? 'Criação permitida apenas no ambiente dev.'
              : `Base atual: ${baseLanguage || '-'}`}
        </BsText>
      </BsBox>

      <BsBox className={languagesSectionStyles.createRowTC}>
        <BsInput
          value={newLanguage}
          onChange={(event) => setNewLanguage(event.target.value)}
          placeholder='en, pt-BR, fr...'
          className={languagesSectionStyles.createInputTC}
          disabled={!canCreateOnCurrentEnvironment || creating}
        />
        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={() => void handleCreate()}
          buttonProps={{ disabled: !canCreateOnCurrentEnvironment || !canCreate || creating }}
          className={languagesSectionStyles.createButtonTC}
        >
          <PlusIcon size={12} /> Criar
        </BsButton>
      </BsBox>

      <BsBox className={languagesSectionStyles.listTC}>
        {loading && <BsBox className={languagesSectionStyles.emptyTC}>Carregando...</BsBox>}

        {!loading && !canMutate && <BsBox className={languagesSectionStyles.emptyTC}>Sem ambiente selecionado.</BsBox>}

        {!loading && canMutate && languages.length === 0 && (
          <BsBox className={languagesSectionStyles.emptyTC}>Nenhum idioma.</BsBox>
        )}

        {!loading &&
          languages.map((language) => {
            const isBase = baseLanguage === language;

            return (
              <BsBox key={language} className={languagesSectionStyles.itemRowTC}>
                <BsButton
                  type='button'
                  variants={{ variant: 'ghost' }}
                  onClick={() => void onEnter(language)}
                  className={
                    selectedLanguage === language
                      ? languagesSectionStyles.itemButtonActiveTC
                      : languagesSectionStyles.itemButtonTC
                  }
                >
                  <ArrowRightIcon size={12} /> {language}
                </BsButton>

                {isBase && <BsBox className={languagesSectionStyles.baseBadgeTC}>base</BsBox>}

                {!isBase && (
                  <BsButton
                    type='button'
                    variants={{ variant: 'outline' }}
                    onClick={() => void onPromote(language)}
                    buttonProps={{ disabled: promoting || demoting || !canChangeBaseOnCurrentEnvironment }}
                    className={languagesSectionStyles.actionButtonTC}
                  >
                    <ArrowUpIcon size={12} />
                  </BsButton>
                )}

                {isBase && (
                  <BsButton
                    type='button'
                    variants={{ variant: 'outline' }}
                    onClick={() => void onDemote(language)}
                    buttonProps={{ disabled: promoting || demoting || !canChangeBaseOnCurrentEnvironment }}
                    className={languagesSectionStyles.actionButtonTC}
                  >
                    <ArrowDownIcon size={12} />
                  </BsButton>
                )}

                <BsButton
                  type='button'
                  variants={{ variant: 'outline' }}
                  onClick={() => {
                    if (window.confirm(`Excluir idioma "${language}"?`)) {
                      void onDelete(language);
                    }
                  }}
                  buttonProps={{ disabled: deleting || !canDeleteOnCurrentEnvironment }}
                  className={languagesSectionStyles.deleteButtonTC}
                >
                  <Trash2Icon size={12} />
                </BsButton>
              </BsBox>
            );
          })}
      </BsBox>
    </BsBox>
  );
}
