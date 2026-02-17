import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getTranslations } from '@/services/generated/translations/translations';

type TranslationJson = Record<string, string | null | undefined>;
export type SortField = 'key' | 'fallback' | 'language';
export type SortDirection = 'asc' | 'desc';

export type TranslationRow = {
  key: string;
  fallbackValue: string;
  languageOriginalValue: string;
};

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;
type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export default function useTraducoes() {
  const { system, environment, language, namespace } = useParams();

  /******************************************************/
  /* Estados de controle da tela                        */
  /******************************************************/
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState<SortField>('key');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(5);

  const [rows, setRows] = useState<TranslationRow[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasValidParams = Boolean(system && environment && language && namespace);

  /******************************************************/
  /* Carregamento de traducoes                          */
  /******************************************************/
  const fetchTranslations = useCallback(
    async (isRefetch = false) => {
      if (!system || !environment || !language || !namespace) {
        return;
      }

      if (isRefetch) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        const [withFallback, withoutFallback] = await Promise.all([
          getTranslations().translationsControllerLoadWithFallBack(system, environment, language, namespace),
          getTranslations().translationsControllerLoadWithoutFallBack(system, environment, language, namespace),
        ]);

        const mergedRows = mergeTranslations(withFallback as TranslationJson, withoutFallback as TranslationJson);
        setRows(mergedRows);
        setEditedValues({});
        setPage(1);
      } catch {
        toast.error('Falha ao carregar traducoes.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [environment, language, namespace, system],
  );

  useEffect(() => {
    void fetchTranslations();
  }, [fetchTranslations]);

  /******************************************************/
  /* Derivacoes de lista                                */
  /******************************************************/
  const originalValuesByKey = useMemo(() => {
    return rows.reduce<Record<string, string>>((acc, row) => {
      acc[row.key] = row.languageOriginalValue;
      return acc;
    }, {});
  }, [rows]);

  const filteredSortedRows = useMemo(() => {
    const normalizedFilter = filter.trim().toLowerCase();

    const filtered = normalizedFilter
      ? rows.filter((row) => {
          const currentLanguageValue = editedValues[row.key] ?? row.languageOriginalValue;
          return (
            row.key.toLowerCase().includes(normalizedFilter) ||
            row.fallbackValue.toLowerCase().includes(normalizedFilter) ||
            currentLanguageValue.toLowerCase().includes(normalizedFilter)
          );
        })
      : rows;

    const sorted = [...filtered].sort((a, b) => {
      const aLanguage = editedValues[a.key] ?? a.languageOriginalValue;
      const bLanguage = editedValues[b.key] ?? b.languageOriginalValue;

      const left = sortField === 'key' ? a.key : sortField === 'fallback' ? a.fallbackValue : aLanguage;
      const right = sortField === 'key' ? b.key : sortField === 'fallback' ? b.fallbackValue : bLanguage;

      const comparison = left.localeCompare(right, undefined, { sensitivity: 'base' });
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [rows, filter, sortField, sortDirection, editedValues]);

  const totalPages = Math.max(1, Math.ceil(filteredSortedRows.length / pageSize));

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSortedRows.slice(start, start + pageSize);
  }, [filteredSortedRows, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const changedEntries = useMemo(() => {
    return Object.entries(editedValues)
      .filter(([key, editedValue]) => {
        const original = originalValuesByKey[key] ?? '';
        return editedValue !== original;
      })
      .map(([key, value]) => ({ key, value }));
  }, [editedValues, originalValuesByKey]);

  const rangeStart = filteredSortedRows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, filteredSortedRows.length);

  /******************************************************/
  /* Handlers de interacao                              */
  /******************************************************/
  const toggleSort = (field: SortField) => {
    setPage(1);

    if (sortField === field) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortField(field);
    setSortDirection('asc');
  };

  const handleInputChange = (key: string, value: string) => {
    setEditedValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSaveChangedTranslations = async () => {
    if (!system || !language || !namespace || changedEntries.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);
      await getTranslations().translationsControllerCreateTranslation({
        system,
        namespace,
        language,
        keys: changedEntries as unknown as string[],
      });

      toast.success('Traducoes atualizadas com sucesso.');
      await fetchTranslations(true);
    } catch {
      toast.error('Falha ao salvar traducoes.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreateKeyModal = () => {
    setNewKey('');
    setIsCreateKeyModalOpen(true);
  };

  const closeCreateKeyModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsCreateKeyModalOpen(false);
  };

  const handleCreateNewKey = async () => {
    if (!system || !namespace) {
      return;
    }

    const trimmedKey = newKey.trim();
    if (!trimmedKey) {
      toast.error('Informe uma chave valida.');
      return;
    }

    try {
      setIsSubmitting(true);
      await getTranslations().translationsControllerCreateNewKey({
        system,
        namespace,
        keys: [trimmedKey],
      });

      toast.success('Nova chave criada com sucesso.');
      setIsCreateKeyModalOpen(false);
      await fetchTranslations(true);
    } catch {
      toast.error('Falha ao criar nova chave.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /******************************************************/
  /* API publica do hook                                */
  /******************************************************/
  return {
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
    editedValues,
    isCreateKeyModalOpen,
    newKey,
    isSubmitting,
    hasValidParams,
    totalPages,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    paginatedRows,
    filteredSortedRows,
    changedEntries,
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
    openCreateKeyModal,
    closeCreateKeyModal,
    handleCreateNewKey,
  };
}

function mergeTranslations(withFallback: TranslationJson, withoutFallback: TranslationJson): TranslationRow[] {
  const keys = new Set([...Object.keys(withFallback), ...Object.keys(withoutFallback)]);

  return [...keys].map((key) => ({
    key,
    fallbackValue: stringifyTranslationValue(withFallback[key]),
    languageOriginalValue: stringifyTranslationValue(withoutFallback[key]),
  }));
}

function stringifyTranslationValue(value: string | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
}
