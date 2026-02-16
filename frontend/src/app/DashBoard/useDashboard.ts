import { useEffect, useMemo, useState } from 'react';
import { getDiagnostic } from '@/services/generated/diagnostic/diagnostic';
import type {
  DiagnosticOverview,
  EnvironmentDiagnostic,
  LanguageDiagnostic,
  NamespaceDiagnostic,
  SystemDiagnostic,
} from '@/services/generated/models';
import { getTranslations } from '@/services/generated/translations/translations';

type DashboardLevel = 'systems' | 'environments' | 'languages' | 'namespaces';

type NamespaceRow = {
  key: string;
  consideredValue: string;
  ownValue: string;
  originalOwnValue: string;
};

export function useDashboard() {
  const [overview, setOverview] = useState<DiagnosticOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSystem, setSelectedSystem] = useState<SystemDiagnostic | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentDiagnostic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageDiagnostic | null>(null);
  const [selectedNamespace, setSelectedNamespace] = useState<NamespaceDiagnostic | null>(null);

  const [namespaceRows, setNamespaceRows] = useState<NamespaceRow[]>([]);
  const [namespaceLoading, setNamespaceLoading] = useState(false);
  const [namespaceError, setNamespaceError] = useState<string | null>(null);
  const [namespaceSaving, setNamespaceSaving] = useState(false);
  const [namespaceSaveInfo, setNamespaceSaveInfo] = useState<string | null>(null);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDiagnostic().diagnosticControllerGetOverview();
      setOverview(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Falha ao carregar overview';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOverview();
  }, []);

  const currentLevel: DashboardLevel = useMemo(() => {
    if (!selectedSystem) return 'systems';
    if (!selectedEnvironment) return 'environments';
    if (!selectedLanguage) return 'languages';
    return 'namespaces';
  }, [selectedSystem, selectedEnvironment, selectedLanguage]);

  const currentItems = useMemo(() => {
    if (!overview) return [];
    if (currentLevel === 'systems') return overview.systems;
    if (currentLevel === 'environments') return selectedSystem?.environments ?? [];
    if (currentLevel === 'languages') return selectedEnvironment?.languages ?? [];
    return selectedLanguage?.namespaces ?? [];
  }, [overview, currentLevel, selectedSystem, selectedEnvironment, selectedLanguage]);

  const breadcrumbs = useMemo(() => {
    const list: Array<{ label: string; level: DashboardLevel }> = [{ label: 'Systems', level: 'systems' }];
    if (selectedSystem) list.push({ label: selectedSystem.system, level: 'environments' });
    if (selectedEnvironment) list.push({ label: selectedEnvironment.environment, level: 'languages' });
    if (selectedLanguage) list.push({ label: selectedLanguage.language, level: 'namespaces' });
    return list;
  }, [selectedSystem, selectedEnvironment, selectedLanguage]);

  const changedNamespaceRows = useMemo(
    () => namespaceRows.filter((row) => row.ownValue !== row.originalOwnValue),
    [namespaceRows],
  );

  const selectItem = async (
    item: SystemDiagnostic | EnvironmentDiagnostic | LanguageDiagnostic | NamespaceDiagnostic,
    level: DashboardLevel,
  ) => {
    if (level === 'systems') {
      setSelectedSystem(item as SystemDiagnostic);
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      clearNamespaceEditor();
      return;
    }

    if (level === 'environments') {
      setSelectedEnvironment(item as EnvironmentDiagnostic);
      setSelectedLanguage(null);
      clearNamespaceEditor();
      return;
    }

    if (level === 'languages') {
      setSelectedLanguage(item as LanguageDiagnostic);
      clearNamespaceEditor();
      return;
    }

    const namespace = item as NamespaceDiagnostic;
    setSelectedNamespace(namespace);
    await loadNamespaceRows(namespace.namespace);
  };

  const goToLevel = (level: DashboardLevel) => {
    if (level === 'systems') {
      setSelectedSystem(null);
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      clearNamespaceEditor();
      return;
    }

    if (level === 'environments') {
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      clearNamespaceEditor();
      return;
    }

    if (level === 'languages') {
      setSelectedLanguage(null);
      clearNamespaceEditor();
      return;
    }
  };

  const updateNamespaceValue = (key: string, value: string) => {
    setNamespaceRows((prev) => prev.map((row) => (row.key === key ? { ...row, ownValue: value } : row)));
    setNamespaceSaveInfo(null);
  };

  const saveNamespaceChanges = async () => {
    if (!selectedSystem || !selectedLanguage || !selectedNamespace || changedNamespaceRows.length === 0) {
      return;
    }

    setNamespaceSaving(true);
    setNamespaceError(null);
    setNamespaceSaveInfo(null);

    try {
      await Promise.all(
        changedNamespaceRows.map((row) =>
          getTranslations().translationsControllerCreateTranslation({
            system: selectedSystem.system,
            language: selectedLanguage.language,
            namespace: selectedNamespace.namespace,
            key: row.key,
            value: row.ownValue,
          }),
        ),
      );

      setNamespaceRows((prev) => prev.map((row) => ({ ...row, originalOwnValue: row.ownValue })));
      setNamespaceSaveInfo(`${changedNamespaceRows.length} alteracao(oes) salvas com sucesso.`);
      await fetchOverview();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Falha ao salvar traducoes';
      setNamespaceError(message);
    } finally {
      setNamespaceSaving(false);
    }
  };

  const closeNamespaceEditor = () => {
    clearNamespaceEditor();
  };

  const loadNamespaceRows = async (namespace: string) => {
    if (!selectedSystem || !selectedEnvironment || !selectedLanguage) {
      return;
    }

    setNamespaceLoading(true);
    setNamespaceError(null);
    setNamespaceSaveInfo(null);
    setNamespaceRows([]);

    try {
      const [withFallback, clean] = await Promise.all([
        getTranslations().translationsControllerLoadWithFallBack(
          selectedSystem.system,
          selectedEnvironment.environment,
          selectedLanguage.language,
          namespace,
        ),
        getTranslations().translationsControllerLoadWithoutFallBack(
          selectedSystem.system,
          selectedEnvironment.environment,
          selectedLanguage.language,
          namespace,
        ),
      ]);

      const fallbackMap = ensureRecord(withFallback);
      const cleanMap = ensureRecord(clean);
      const allKeys = Array.from(new Set([...Object.keys(fallbackMap), ...Object.keys(cleanMap)])).sort((a, b) =>
        a.localeCompare(b),
      );

      const rows = allKeys.map((key) => {
        const ownRaw = cleanMap[key];
        const ownValue = ownRaw === null || ownRaw === undefined ? '' : String(ownRaw);

        return {
          key,
          consideredValue: toDisplayValue(fallbackMap[key]),
          ownValue,
          originalOwnValue: ownValue,
        } satisfies NamespaceRow;
      });

      setNamespaceRows(rows);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Falha ao carregar dados do namespace';
      setNamespaceError(message);
    } finally {
      setNamespaceLoading(false);
    }
  };

  const clearNamespaceEditor = () => {
    setSelectedNamespace(null);
    setNamespaceRows([]);
    setNamespaceError(null);
    setNamespaceSaveInfo(null);
    setNamespaceSaving(false);
    setNamespaceLoading(false);
  };

  return {
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
  };
}

function ensureRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function toDisplayValue(value: unknown): string {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}
