import cadastroStyles from './cadastro.styles';
import { EnvironmentsSection, LanguagesSection, NamespacesSection, SystemsSection } from './components';
import useCadastro from './useCadastro';
import { BsBox, BsText } from '@/components/singles/BaseComponents';

function Cadastro() {
  const {
    systems,
    environments,
    languages,
    namespaces,
    selectedSystem,
    selectedEnvironment,
    selectedLanguage,
    baseLanguage,
    busyActions,
    enterSystem,
    enterEnvironment,
    enterLanguage,
    openNamespaceTranslations,
    createSystem,
    deleteSystem,
    createEnvironment,
    deleteEnvironment,
    createLanguage,
    deleteLanguage,
    promoteLanguage,
    demoteBaseLanguage,
    createNamespace,
    deleteNamespace,
  } = useCadastro();

  return (
    <BsBox as='main' className={cadastroStyles.pageTC}>
      <BsBox className={cadastroStyles.contentTC}>
        {/* -------------------------------------- */}
        {/* Header                                 */}
        {/* -------------------------------------- */}
        <BsBox className={cadastroStyles.headerTC}>
          <BsText className={cadastroStyles.titleTC}>Cadastro de Estrutura</BsText>
          <BsText className={cadastroStyles.subtitleTC}>
            Crie, remova e navegue por sistemas, ambientes, idiomas e namespaces.
          </BsText>
        </BsBox>

        {/* -------------------------------------- */}
        {/* Colunas por nivel                      */}
        {/* -------------------------------------- */}
        <BsBox className={cadastroStyles.gridTC}>
          <SystemsSection
            systems={systems}
            selectedSystem={selectedSystem}
            onEnter={enterSystem}
            onCreate={createSystem}
            onDelete={deleteSystem}
            loading={busyActions.loadSystems}
            creating={busyActions.createSystem}
            deleting={busyActions.deleteSystem}
          />

          <EnvironmentsSection
            environments={environments}
            selectedSystem={selectedSystem}
            selectedEnvironment={selectedEnvironment}
            onEnter={enterEnvironment}
            onCreate={createEnvironment}
            onDelete={deleteEnvironment}
            loading={busyActions.loadEnvironments}
            creating={busyActions.createEnvironment}
            deleting={busyActions.deleteEnvironment}
          />

          <LanguagesSection
            languages={languages}
            selectedSystem={selectedSystem}
            selectedEnvironment={selectedEnvironment}
            selectedLanguage={selectedLanguage}
            baseLanguage={baseLanguage}
            onEnter={enterLanguage}
            onCreate={createLanguage}
            onDelete={deleteLanguage}
            onPromote={promoteLanguage}
            onDemote={demoteBaseLanguage}
            loading={busyActions.loadLanguages}
            creating={busyActions.createLanguage}
            deleting={busyActions.deleteLanguage}
            promoting={busyActions.promoteLanguage}
            demoting={busyActions.demoteLanguage}
          />

          <NamespacesSection
            namespaces={namespaces}
            selectedSystem={selectedSystem}
            selectedEnvironment={selectedEnvironment}
            selectedLanguage={selectedLanguage}
            onOpen={openNamespaceTranslations}
            onCreate={createNamespace}
            onDelete={deleteNamespace}
            loading={busyActions.loadNamespaces}
            creating={busyActions.createNamespace}
            deleting={busyActions.deleteNamespace}
          />
        </BsBox>
      </BsBox>
    </BsBox>
  );
}

export default Cadastro;

