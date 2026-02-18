import cadastroDeChavesStyles from './cadastro-de-chaves.styles';
import useCadastroDeChaves from './useCadastroDeChaves';
import { TSSelect, TSSelectOption } from '@/components/primitives';
import { BsBox, BsButton, BsText } from '@/components/singles/BaseComponents';
import { BsTextArea } from '@/components/singles/BaseComponents/BsTextArea';

function CadastroDeChaves() {
  const states = useCadastroDeChaves();
  const { systems, languages, namespaces, selectedSystem, selectedLanguage, selectedNamespace, baseLanguage } = states;
  const { isOnBaseLanguage, selectedEnvironment, rawText, loadingSystems, loadingLanguages } = states;
  const { loadingNamespaces, submittingKeys, submittingTranslations, canSubmitKeys, canSubmitTranslations } = states;
  const { setSelectedNamespace, setRawText, handleSelectSystem, handleSelectLanguage } = states;
  const { handleCreateKeys, handleCreateTranslations } = states;

  return (
    <BsBox as='main' className={cadastroDeChavesStyles.pageTC}>
      <BsBox className={cadastroDeChavesStyles.contentTC}>
        {/* -------------------------------------- */}
        {/* Header                                 */}
        {/* -------------------------------------- */}
        <BsBox className={cadastroDeChavesStyles.headerTC}>
          <BsText className={cadastroDeChavesStyles.titleTC}>Cadastro de Chaves e Traduções</BsText>
          <BsText className={cadastroDeChavesStyles.subtitleTC}>
            Selecione sistema/idioma/namespace e informe um item por linha no texto.
          </BsText>
        </BsBox>

        {/* -------------------------------------- */}
        {/* Seletores de contexto                  */}
        {/* -------------------------------------- */}
        <BsBox className={cadastroDeChavesStyles.cardTC}>
          <BsBox className={cadastroDeChavesStyles.selectorsGridTC}>
            <BsBox className={cadastroDeChavesStyles.fieldTC}>
              <BsText className={cadastroDeChavesStyles.fieldLabelTC}>Sistema</BsText>
              <TSSelect
                value={selectedSystem}
                onChange={(event) => {
                  void handleSelectSystem(event.target.value);
                }}
                className={cadastroDeChavesStyles.selectTC}
                disabled={loadingSystems}
              >
                <TSSelectOption value=''>Selecione um sistema</TSSelectOption>
                {systems.map((system) => (
                  <TSSelectOption key={system} value={system}>
                    {system}
                  </TSSelectOption>
                ))}
              </TSSelect>
            </BsBox>

            <BsBox className={cadastroDeChavesStyles.fieldTC}>
              <BsText className={cadastroDeChavesStyles.fieldLabelTC}>Idioma</BsText>
              <TSSelect
                value={selectedLanguage}
                onChange={(event) => {
                  void handleSelectLanguage(event.target.value);
                }}
                className={cadastroDeChavesStyles.selectTC}
                disabled={!selectedSystem || loadingLanguages}
              >
                <TSSelectOption value=''>Selecione um idioma</TSSelectOption>
                {languages.map((language) => (
                  <TSSelectOption key={language} value={language}>
                    {language}
                  </TSSelectOption>
                ))}
              </TSSelect>
            </BsBox>

            <BsBox className={cadastroDeChavesStyles.fieldTC}>
              <BsText className={cadastroDeChavesStyles.fieldLabelTC}>Namespace</BsText>
              <TSSelect
                value={selectedNamespace}
                onChange={(event) => setSelectedNamespace(event.target.value)}
                className={cadastroDeChavesStyles.selectTC}
                disabled={!selectedLanguage || loadingNamespaces}
              >
                <TSSelectOption value=''>Selecione um namespace</TSSelectOption>
                {namespaces.map((namespace) => (
                  <TSSelectOption key={namespace} value={namespace}>
                    {namespace}
                  </TSSelectOption>
                ))}
              </TSSelect>
            </BsBox>
          </BsBox>

          <BsBox className={cadastroDeChavesStyles.hintTC}>
            Ambiente de operação: <strong>{selectedEnvironment}</strong>
          </BsBox>
          {!isOnBaseLanguage && selectedLanguage && (
            <BsBox className={cadastroDeChavesStyles.hintTC}>
              Cadastro de chaves exige idioma base selecionado. Base atual: <strong>{baseLanguage || '-'}</strong>
            </BsBox>
          )}

          {/* -------------------------------------- */}
          {/* Entrada de texto em massa              */}
          {/* -------------------------------------- */}
          <BsTextArea
            value={rawText}
            onChange={(event) => setRawText(event.target.value)}
            className={cadastroDeChavesStyles.textAreaTC}
            placeholder={[
              'Para cadastrar chaves: uma chave por linha (sem ";")',
              'Ex: common.button.save',
              '',
              'Para cadastrar traduções: chave;valor por linha (exatamente um ";")',
              'Ex: common.button.save;Salvar',
            ].join('\n')}
          />

          {/* -------------------------------------- */}
          {/* Ações                                  */}
          {/* -------------------------------------- */}
          <BsBox className={cadastroDeChavesStyles.actionsTC}>
            <BsButton
              type='button'
              variants={{ variant: 'outline' }}
              onClick={() => void handleCreateKeys()}
              buttonProps={{ disabled: !canSubmitKeys || submittingKeys || submittingTranslations }}
              className={cadastroDeChavesStyles.actionButtonTC}
            >
              {submittingKeys ? 'Cadastrando chaves...' : 'Cadastrar Chaves'}
            </BsButton>
            <BsButton
              type='button'
              onClick={() => void handleCreateTranslations()}
              buttonProps={{ disabled: !canSubmitTranslations || submittingTranslations || submittingKeys }}
              className={cadastroDeChavesStyles.actionButtonTC}
            >
              {submittingTranslations ? 'Cadastrando traduções...' : 'Cadastrar Traduções'}
            </BsButton>
          </BsBox>
        </BsBox>
      </BsBox>
    </BsBox>
  );
}

export default CadastroDeChaves;
