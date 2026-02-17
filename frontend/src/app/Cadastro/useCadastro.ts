import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getEnvironment } from '@/services/generated/environment/environment';
import { getLanguage } from '@/services/generated/language/language';
import { getNamespace } from '@/services/generated/namespace/namespace';
import { getSystem } from '@/services/generated/system/system';

type BusyAction =
  | 'createSystem'
  | 'deleteSystem'
  | 'createEnvironment'
  | 'deleteEnvironment'
  | 'createLanguage'
  | 'deleteLanguage'
  | 'promoteLanguage'
  | 'demoteLanguage'
  | 'createNamespace'
  | 'deleteNamespace'
  | 'loadSystems'
  | 'loadEnvironments'
  | 'loadLanguages'
  | 'loadNamespaces';

function normalizeStringList(response: unknown): string[] {
  if (Array.isArray(response)) {
    return response.filter((item): item is string => typeof item === 'string');
  }

  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    Array.isArray((response as { data?: unknown[] }).data)
  ) {
    return (response as { data: unknown[] }).data.filter((item): item is string => typeof item === 'string');
  }

  return [];
}

export default function useCadastro() {
  const navigate = useNavigate();

  const [systems, setSystems] = useState<string[]>([]);
  const [environments, setEnvironments] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [namespaces, setNamespaces] = useState<string[]>([]);

  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [baseLanguage, setBaseLanguage] = useState<string | null>(null);

  const [busyActions, setBusyActions] = useState<Record<BusyAction, boolean>>({
    createSystem: false,
    deleteSystem: false,
    createEnvironment: false,
    deleteEnvironment: false,
    createLanguage: false,
    deleteLanguage: false,
    promoteLanguage: false,
    demoteLanguage: false,
    createNamespace: false,
    deleteNamespace: false,
    loadSystems: false,
    loadEnvironments: false,
    loadLanguages: false,
    loadNamespaces: false,
  });

  const setBusy = (action: BusyAction, value: boolean) => {
    setBusyActions((current) => ({
      ...current,
      [action]: value,
    }));
  };

  const loadSystems = useCallback(async () => {
    try {
      setBusy('loadSystems', true);
      const response = await getSystem().systemControllerGetSystemInfo();
      setSystems(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
    } catch {
      toast.error('Falha ao carregar sistemas.');
    } finally {
      setBusy('loadSystems', false);
    }
  }, []);

  const loadEnvironments = useCallback(async (system: string) => {
    try {
      setBusy('loadEnvironments', true);
      const response = await getEnvironment().environmentControllerGetSystemInfo(system);
      setEnvironments(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
    } catch {
      toast.error('Falha ao carregar ambientes.');
    } finally {
      setBusy('loadEnvironments', false);
    }
  }, []);

  const loadLanguages = useCallback(async (system: string, environment: string) => {
    try {
      setBusy('loadLanguages', true);
      const [languagesResponse, baseResponse] = await Promise.all([
        getLanguage().languageControllerGetSystemInfo(system, environment),
        getLanguage().languageControllerGetBaseLanguage(system, environment),
      ]);

      setLanguages(normalizeStringList(languagesResponse).sort((a, b) => a.localeCompare(b)));
      setBaseLanguage(baseResponse?.data || null);
    } catch {
      toast.error('Falha ao carregar idiomas.');
    } finally {
      setBusy('loadLanguages', false);
    }
  }, []);

  const loadNamespaces = useCallback(async (system: string, environment: string, language: string) => {
    try {
      setBusy('loadNamespaces', true);
      const response = await getNamespace().namespaceControllerListNamespaces(system, environment, language);
      setNamespaces(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
    } catch {
      toast.error('Falha ao carregar namespaces.');
    } finally {
      setBusy('loadNamespaces', false);
    }
  }, []);

  useEffect(() => {
    void loadSystems();
  }, [loadSystems]);

  const enterSystem = async (system: string) => {
    setSelectedSystem(system);
    setSelectedEnvironment(null);
    setSelectedLanguage(null);
    setBaseLanguage(null);
    setEnvironments([]);
    setLanguages([]);
    setNamespaces([]);
    await loadEnvironments(system);
  };

  const enterEnvironment = async (environment: string) => {
    if (!selectedSystem) {
      return;
    }

    setSelectedEnvironment(environment);
    setSelectedLanguage(null);
    setLanguages([]);
    setNamespaces([]);
    await loadLanguages(selectedSystem, environment);
  };

  const enterLanguage = async (language: string) => {
    if (!selectedSystem || !selectedEnvironment) {
      return;
    }

    setSelectedLanguage(language);
    setNamespaces([]);
    await loadNamespaces(selectedSystem, selectedEnvironment, language);
  };

  const openNamespaceTranslations = (namespace: string) => {
    if (!selectedSystem || !selectedEnvironment || !selectedLanguage) {
      return;
    }

    void navigate(`/traducoes/${selectedSystem}/${selectedEnvironment}/${selectedLanguage}/${namespace}`);
  };

  const createSystem = async (system: string) => {
    try {
      setBusy('createSystem', true);
      await getSystem().systemControllerCreateSystem({ system });
      toast.success('Sistema criado com sucesso.');
      await loadSystems();
    } catch {
      toast.error('Falha ao criar sistema.');
    } finally {
      setBusy('createSystem', false);
    }
  };

  const deleteSystem = async (system: string) => {
    try {
      setBusy('deleteSystem', true);
      await getSystem().systemControllerDeleteSystem({ system });
      toast.success('Sistema removido com sucesso.');

      if (selectedSystem === system) {
        setSelectedSystem(null);
        setSelectedEnvironment(null);
        setSelectedLanguage(null);
        setBaseLanguage(null);
        setEnvironments([]);
        setLanguages([]);
        setNamespaces([]);
      }

      await loadSystems();
    } catch {
      toast.error('Falha ao remover sistema.');
    } finally {
      setBusy('deleteSystem', false);
    }
  };

  const createEnvironment = async (environment: string) => {
    if (!selectedSystem) {
      return;
    }

    try {
      setBusy('createEnvironment', true);
      await getEnvironment().environmentControllerCreateEnvironment({
        system: selectedSystem,
        environment,
      });
      toast.success('Ambiente criado com sucesso.');
      await loadEnvironments(selectedSystem);
    } catch {
      toast.error('Falha ao criar ambiente.');
    } finally {
      setBusy('createEnvironment', false);
    }
  };

  const deleteEnvironment = async (environment: string) => {
    if (!selectedSystem) {
      return;
    }

    try {
      setBusy('deleteEnvironment', true);
      await getEnvironment().environmentControllerDeleteEnvironment({
        system: selectedSystem,
        environment,
      });
      toast.success('Ambiente removido com sucesso.');

      if (selectedEnvironment === environment) {
        setSelectedEnvironment(null);
        setSelectedLanguage(null);
        setBaseLanguage(null);
        setLanguages([]);
        setNamespaces([]);
      }

      await loadEnvironments(selectedSystem);
    } catch {
      toast.error('Falha ao remover ambiente.');
    } finally {
      setBusy('deleteEnvironment', false);
    }
  };

  const createLanguage = async (code: string) => {
    if (!selectedSystem) {
      return;
    }

    try {
      setBusy('createLanguage', true);
      await getLanguage().languageControllerCreateLanguage({
        system: selectedSystem,
        code,
      });
      toast.success('Idioma criado com sucesso.');

      if (selectedEnvironment) {
        await loadLanguages(selectedSystem, selectedEnvironment);
      }
    } catch {
      toast.error('Falha ao criar idioma.');
    } finally {
      setBusy('createLanguage', false);
    }
  };

  const deleteLanguage = async (code: string) => {
    if (!selectedSystem || selectedEnvironment !== 'dev') {
      if (selectedEnvironment && selectedEnvironment !== 'dev') {
        toast.error('Exclusão de idioma permitida apenas no ambiente dev.');
      }
      return;
    }

    try {
      setBusy('deleteLanguage', true);
      await getLanguage().languageControllerDeleteLanguage({
        system: selectedSystem,
        code,
      });
      toast.success('Idioma removido com sucesso.');

      if (selectedLanguage === code) {
        setSelectedLanguage(null);
        setNamespaces([]);
      }

      if (selectedEnvironment) {
        await loadLanguages(selectedSystem, selectedEnvironment);
      }
    } catch {
      toast.error('Falha ao remover idioma.');
    } finally {
      setBusy('deleteLanguage', false);
    }
  };

  const promoteLanguage = async (code: string) => {
    if (!selectedSystem || !selectedEnvironment) {
      return;
    }
    if (selectedEnvironment !== 'dev') {
      toast.error('Promoção para idioma base permitida apenas no ambiente dev.');
      return;
    }

    try {
      setBusy('promoteLanguage', true);
      await getLanguage().languageControllerPromoteToBaseLanguage({
        system: selectedSystem,
        code,
      });
      toast.success('Idioma promovido para base.');
      await loadLanguages(selectedSystem, selectedEnvironment);
    } catch {
      toast.error('Falha ao promover idioma para base.');
    } finally {
      setBusy('promoteLanguage', false);
    }
  };

  const demoteBaseLanguage = async (code: string) => {
    if (!selectedSystem || !selectedEnvironment) {
      return;
    }
    if (selectedEnvironment !== 'dev') {
      toast.error('Rebaixamento de idioma base permitido apenas no ambiente dev.');
      return;
    }

    try {
      setBusy('demoteLanguage', true);
      await getLanguage().languageControllerDemoteBaseLanguage({
        system: selectedSystem,
        code,
      });
      toast.success('Idioma base rebaixado.');
      await loadLanguages(selectedSystem, selectedEnvironment);
    } catch {
      toast.error('Falha ao rebaixar idioma base.');
    } finally {
      setBusy('demoteLanguage', false);
    }
  };

  const createNamespace = async (namespace: string) => {
    if (!selectedSystem) {
      return;
    }

    try {
      setBusy('createNamespace', true);
      await getNamespace().namespaceControllerCreateNamespace({
        system: selectedSystem,
        namespace,
      } as { system: string; namespace: string });
      toast.success('Namespace criado com sucesso.');

      if (selectedEnvironment && selectedLanguage) {
        await loadNamespaces(selectedSystem, selectedEnvironment, selectedLanguage);
      }
    } catch {
      toast.error('Falha ao criar namespace.');
    } finally {
      setBusy('createNamespace', false);
    }
  };

  const deleteNamespace = async (namespace: string) => {
    if (!selectedSystem || selectedEnvironment !== 'dev') {
      if (selectedEnvironment && selectedEnvironment !== 'dev') {
        toast.error('Exclusão de namespace permitida apenas no ambiente dev.');
      }
      return;
    }

    try {
      setBusy('deleteNamespace', true);
      await getNamespace().namespaceControllerDeleteNamespace({
        system: selectedSystem,
        namespace,
      } as { system: string; namespace: string });
      toast.success('Namespace removido com sucesso.');

      if (selectedEnvironment && selectedLanguage) {
        await loadNamespaces(selectedSystem, selectedEnvironment, selectedLanguage);
      }
    } catch {
      toast.error('Falha ao remover namespace.');
    } finally {
      setBusy('deleteNamespace', false);
    }
  };

  return {
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
  };
}
