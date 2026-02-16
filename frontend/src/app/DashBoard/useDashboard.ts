import { useEffect, useMemo, useState } from 'react';
import { getDiagnostic } from '@/services/generated/diagnostic/diagnostic';
import type {
  DiagnosticOverview,
  EnvironmentDiagnostic,
  LanguageDiagnostic,
  NamespaceDiagnostic,
  SystemDiagnostic,
} from '@/services/generated/models';

type DashboardLevel = 'systems' | 'environments' | 'languages' | 'namespaces';

export function useDashboard() {
  const [overview, setOverview] = useState<DiagnosticOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSystem, setSelectedSystem] = useState<SystemDiagnostic | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentDiagnostic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageDiagnostic | null>(null);
  const [selectedNamespace, setSelectedNamespace] = useState<NamespaceDiagnostic | null>(null);

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

  const selectItem = (
    item: SystemDiagnostic | EnvironmentDiagnostic | LanguageDiagnostic | NamespaceDiagnostic,
    level: DashboardLevel,
  ) => {
    if (level === 'systems') {
      setSelectedSystem(item as SystemDiagnostic);
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      return;
    }

    if (level === 'environments') {
      setSelectedEnvironment(item as EnvironmentDiagnostic);
      setSelectedLanguage(null);
      return;
    }

    if (level === 'languages') {
      setSelectedLanguage(item as LanguageDiagnostic);
      return;
    }

    setSelectedNamespace(item as NamespaceDiagnostic);
  };

  const goToLevel = (level: DashboardLevel) => {
    if (level === 'systems') {
      setSelectedSystem(null);
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      return;
    }

    if (level === 'environments') {
      setSelectedEnvironment(null);
      setSelectedLanguage(null);
      return;
    }

    if (level === 'languages') {
      setSelectedLanguage(null);
      return;
    }
  };

  const closeNamespaceModal = () => setSelectedNamespace(null);

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
    closeNamespaceModal,
  };
}
