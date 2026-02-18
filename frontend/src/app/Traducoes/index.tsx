import { memo, useEffect, useState } from 'react';
import { CheckIcon, FileTextIcon, PlusIcon, RefreshCwIcon, SaveIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { InfoBadge, SortHeader, StatPill } from './components';
import traducoesStyles from './traducoes.styles';
import useTraducoes from './useTraducoes';
import { TSSelect, TSSelectOption } from '@/components/primitives';
import {
  BsBox,
  BsButton,
  BsInput,
  BsTable,
  BsTableBody,
  BsTableCell,
  BsTableHead,
  BsTableHeader,
  BsTableRow,
  BsText,
} from '@/components/singles/BaseComponents';
import { Modal } from '@/components/singles/Modal/Modal';
import { envConfig } from '@/envConfig';

type EditableLanguageInputProps = {
  rowKey: string;
  originalValue: string;
  disabled: boolean;
  resetVersion: number;
  onInputChange: (key: string, value: string, originalValue: string) => boolean;
};

const EditableLanguageInput = memo(function EditableLanguageInput({
  rowKey,
  originalValue,
  disabled,
  resetVersion,
  onInputChange,
}: EditableLanguageInputProps) {
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(false);
  }, [resetVersion, rowKey, originalValue]);

  return (
    <BsBox className={traducoesStyles.inputWrapTC}>
      <BsInput
        defaultValue={originalValue}
        onChange={(event) => setIsChanged(onInputChange(rowKey, event.target.value, originalValue))}
        disabled={disabled}
        className={isChanged ? traducoesStyles.inputChangedTC : traducoesStyles.inputDefaultTC}
      />
    </BsBox>
  );
});

function Traducoes() {
  const {
    system,
    environment,
    language,
    namespace,
    loading,
    refreshing,
    filter,
    sortField,
    sortDirection,
    page,
    pageSize,
    rows,
    changedCount,
    inputResetVersion,
    isCreateKeyModalOpen,
    newKey,
    isSubmitting,
    hasValidParams,
    canMutateTranslations,
    isOnBaseLanguage,
    totalPages,
    pageSizeOptions,
    paginatedRows,
    filteredSortedRows,
    rangeStart,
    rangeEnd,
    setFilter,
    setPage,
    setPageSize,
    setNewKey,
    fetchTranslations,
    toggleSort,
    handleInputChange,
    handleSaveChangedTranslations,
    handleDeleteKey,
    openCreateKeyModal,
    closeCreateKeyModal,
    handleCreateNewKey,
  } = useTraducoes();

  if (!hasValidParams) {
    return <BsText variants={{ variant: 'error' }}>Parametros invalidos para carregar traducoes.</BsText>;
  }

  if (loading) {
    return <BsText>Carregando traducoes...</BsText>;
  }

  return (
    <BsBox className={traducoesStyles.pageTC}>
      {/* -------------------------------------- */}
      {/* Header / contexto da pagina            */}
      {/* -------------------------------------- */}
      <BsBox className={traducoesStyles.heroCardTC}>
        <BsBox className={traducoesStyles.heroGlowTC} />

        <BsBox className={traducoesStyles.heroContentTC}>
          {/* Estrutura do header */}
          <BsBox className={traducoesStyles.heroTitleWrapTC}>
            <BsText className={traducoesStyles.heroTitleTC}>Editor de Traducoes</BsText>
            <BsBox className={traducoesStyles.badgesRowTC}>
              <InfoBadge>{system}</InfoBadge>
              <InfoBadge>{environment}</InfoBadge>
              <InfoBadge>{language}</InfoBadge>
              <InfoBadge>{namespace}</InfoBadge>
            </BsBox>
          </BsBox>

          {/* Botoes de acao */}
          <BsBox className={traducoesStyles.actionButtonsTC}>
            <BsButton
              type='button'
              variants={{ variant: 'outline' }}
              onClick={() => void fetchTranslations(true)}
              buttonProps={{ disabled: refreshing || isSubmitting }}
              className={traducoesStyles.actionButtonTC}
            >
              <RefreshCwIcon size={14} className={refreshing ? 'animate-spin' : ''} /> Atualizar
            </BsButton>
            <BsButton
              type='button'
              variants={{ variant: 'outline' }}
              onClick={openCreateKeyModal}
              buttonProps={{ disabled: isSubmitting || !canMutateTranslations }}
              className={traducoesStyles.actionButtonTC}
            >
              <PlusIcon size={14} /> Nova chave
            </BsButton>
            <BsButton
              type='button'
              onClick={() => void handleSaveChangedTranslations()}
              buttonProps={{ disabled: changedCount === 0 || isSubmitting || !canMutateTranslations }}
              className={traducoesStyles.actionButtonTC}
            >
              <SaveIcon size={14} /> Salvar ({changedCount})
            </BsButton>
          </BsBox>
        </BsBox>
        {!canMutateTranslations && (
          <BsText variants={{ variant: 'small' }} className={traducoesStyles.mutationHintTC}>
            Edição e criação de chave disponíveis apenas no ambiente {envConfig.devEnvironment}.
          </BsText>
        )}
      </BsBox>

      {/* -------------------------------------- */}
      {/* Filtro e indicadores                   */}
      {/* -------------------------------------- */}
      <BsBox className={traducoesStyles.filtersCardTC}>
        <BsBox className={traducoesStyles.filtersRowTC}>
          <BsBox className={traducoesStyles.searchWrapTC}>
            <SearchIcon size={14} className={traducoesStyles.searchIconTC} />
            <BsInput
              placeholder='Filtrar por chave, fallback ou valor do idioma...'
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value);
                setPage(1);
              }}
              className={traducoesStyles.searchInputTC}
            />
          </BsBox>

          <BsBox className={traducoesStyles.statsRowTC}>
            <StatPill label='Total' value={rows.length} />
            <StatPill label='Filtrado' value={filteredSortedRows.length} />
            <StatPill label='Alterados' value={changedCount} highlight />
          </BsBox>
        </BsBox>
      </BsBox>

      {/* -------------------------------------- */}
      {/* Grid de traducoes                      */}
      {/* -------------------------------------- */}
      <BsBox className={traducoesStyles.tableCardTC}>
        <BsTable className={traducoesStyles.tableTC}>
          <BsTableHeader className={traducoesStyles.tableHeaderTC}>
            <BsTableRow className={traducoesStyles.headerRowTC}>
              <BsTableHead className={traducoesStyles.headKeyTC}>
                <SortHeader
                  label='Chave'
                  active={sortField === 'key'}
                  direction={sortDirection}
                  onClick={() => toggleSort('key')}
                />
              </BsTableHead>
              <BsTableHead className={traducoesStyles.headFallbackTC}>
                <SortHeader
                  label='Valor considerado'
                  active={sortField === 'fallback'}
                  direction={sortDirection}
                  onClick={() => toggleSort('fallback')}
                />
              </BsTableHead>
              <BsTableHead className={traducoesStyles.headLanguageTC}>
                <SortHeader
                  label='Valor idioma'
                  active={sortField === 'language'}
                  direction={sortDirection}
                  onClick={() => toggleSort('language')}
                />
              </BsTableHead>
            </BsTableRow>
          </BsTableHeader>

          <BsTableBody>
            {paginatedRows.map((row) => {
              return (
                <BsTableRow key={row.key} className={traducoesStyles.bodyRowTC}>
                  <BsTableCell className={traducoesStyles.cellTC}>
                    <BsBox className={traducoesStyles.keyRowTC}>
                      <BsText className={traducoesStyles.keyTextTC}>{row.key}</BsText>
                      {isOnBaseLanguage && canMutateTranslations && (
                        <BsButton
                          type='button'
                          variants={{ variant: 'outline' }}
                          onClick={() => {
                            if (window.confirm(`Excluir chave "${row.key}"?`)) {
                              void handleDeleteKey(row.key);
                            }
                          }}
                          buttonProps={{ disabled: !canMutateTranslations || isSubmitting }}
                          className={traducoesStyles.deleteKeyButtonTC}
                        >
                          <Trash2Icon size={12} />
                        </BsButton>
                      )}
                    </BsBox>
                  </BsTableCell>

                  <BsTableCell className={traducoesStyles.cellTC}>
                    <BsText className={traducoesStyles.fallbackTextTC}>{row.fallbackValue || '-'}</BsText>
                  </BsTableCell>

                  <BsTableCell className={traducoesStyles.cellTC}>
                    <EditableLanguageInput
                      rowKey={row.key}
                      originalValue={row.languageOriginalValue}
                      resetVersion={inputResetVersion}
                      disabled={!canMutateTranslations || isSubmitting}
                      onInputChange={handleInputChange}
                    />
                  </BsTableCell>
                </BsTableRow>
              );
            })}

            {paginatedRows.length === 0 && (
              <BsTableRow>
                <BsTableCell colSpan={3} className={traducoesStyles.emptyCellTC}>
                  <BsBox className={traducoesStyles.emptyWrapTC}>
                    <FileTextIcon size={18} />
                    <BsText variants={{ variant: 'muted' }}>Nenhum resultado encontrado.</BsText>
                  </BsBox>
                </BsTableCell>
              </BsTableRow>
            )}
          </BsTableBody>
        </BsTable>
      </BsBox>

      {/* -------------------------------------- */}
      {/* Paginacao                              */}
      {/* -------------------------------------- */}
      <BsBox className={traducoesStyles.paginationCardTC}>
        <BsBox className={traducoesStyles.paginationRowTC}>
          <BsText variants={{ variant: 'small' }} className={traducoesStyles.paginationInfoTC}>
            Exibindo {rangeStart}-{rangeEnd} de {filteredSortedRows.length}
          </BsText>

          <BsBox className={traducoesStyles.paginationControlsTC}>
            <BsBox className={traducoesStyles.pageSizeWrapTC}>
              <BsText variants={{ variant: 'small' }} className={traducoesStyles.pageSizeLabelTC}>
                Itens por pagina
              </BsText>
              <TSSelect
                value={String(pageSize)}
                onChange={(event) => {
                  setPageSize(Number(event.target.value) as 5 | 10 | 20 | 50);
                  setPage(1);
                }}
                className={traducoesStyles.pageSizeSelectTC}
              >
                {pageSizeOptions.map((option) => (
                  <TSSelectOption key={option} value={String(option)}>
                    {option}
                  </TSSelectOption>
                ))}
              </TSSelect>
            </BsBox>

            <BsButton
              type='button'
              variants={{ variant: 'outline' }}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              buttonProps={{ disabled: page <= 1 }}
              className={traducoesStyles.actionButtonTC}
            >
              Anterior
            </BsButton>
            <BsBox className={traducoesStyles.pageIndicatorTC}>
              {page} / {totalPages}
            </BsBox>
            <BsButton
              type='button'
              variants={{ variant: 'outline' }}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              buttonProps={{ disabled: page >= totalPages }}
              className={traducoesStyles.actionButtonTC}
            >
              Proxima
            </BsButton>
          </BsBox>
        </BsBox>
      </BsBox>

      {/* -------------------------------------- */}
      {/* Modal: nova chave                      */}
      {/* -------------------------------------- */}
      <Modal isOpen={isCreateKeyModalOpen} onClose={closeCreateKeyModal} className='w-full max-w-md'>
        <BsBox className={traducoesStyles.modalContentTC}>
          <BsBox className={traducoesStyles.modalTitleWrapTC}>
            <BsText as='h3' variants={{ weight: 'semibold' }}>
              Criar nova chave
            </BsText>
            <BsText variants={{ variant: 'small' }}>A nova chave sera criada no sistema/namespace atual.</BsText>
          </BsBox>

          <BsInput
            value={newKey}
            onChange={(event) => setNewKey(event.target.value)}
            placeholder='ex: common.button.save'
            autoFocus
          />

          <BsBox className={traducoesStyles.modalContextTC}>
            <BsText variants={{ variant: 'small' }}>
              Sistema: {system} | Namespace: {namespace}
            </BsText>
          </BsBox>

          <BsBox className={traducoesStyles.modalActionsTC}>
            <BsButton
              type='button'
              variants={{ variant: 'ghost' }}
              onClick={closeCreateKeyModal}
              buttonProps={{ disabled: isSubmitting }}
            >
              Cancelar
            </BsButton>
            <BsButton type='button' onClick={() => void handleCreateNewKey()} buttonProps={{ disabled: isSubmitting }}>
              <CheckIcon size={14} /> Confirmar
            </BsButton>
          </BsBox>
        </BsBox>
      </Modal>
    </BsBox>
  );
}

export default Traducoes;
