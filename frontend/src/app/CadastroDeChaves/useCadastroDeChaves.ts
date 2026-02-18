import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { envConfig } from '@/envConfig';
import { getLanguage } from '@/services/generated/language/language';
import { getNamespace } from '@/services/generated/namespace/namespace';
import { getSystem } from '@/services/generated/system/system';
import { getTranslations } from '@/services/generated/translations/translations';

type ParsedTranslation = {
  key: string;
  value: string;
};

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

function sanitizeRawText(rawText: string): string {
  const normalizedBreaks = rawText.replace(/\r\n?/g, '\n');
  const withoutTabs = normalizedBreaks.replace(/\t+/g, ' ');

  const lines = withoutTabs
    .split('\n')
    .map((line) => line.replace(/\s+$/g, '').trimStart())
    .filter((line) => line.trim().length > 0);

  return lines.join('\n');
}

function parseKeyLines(rawText: string): { keys: string[]; error?: string } {
  const sanitized = sanitizeRawText(rawText);
  const lines = sanitized.split('\n').filter(Boolean);

  if (lines.length === 0) {
    return { keys: [], error: 'Informe ao menos uma chave.' };
  }

  for (const line of lines) {
    if (line.includes(';')) {
      return { keys: [], error: 'Para cadastrar chaves, não use ";" nas linhas.' };
    }
  }

  return { keys: lines };
}

function parseTranslationLines(rawText: string): { keys: ParsedTranslation[]; error?: string } {
  const sanitized = sanitizeRawText(rawText);
  const lines = sanitized.split('\n').filter(Boolean);

  if (lines.length === 0) {
    return { keys: [], error: 'Informe ao menos uma linha no formato chave;valor.' };
  }

  const parsed: ParsedTranslation[] = [];

  for (const line of lines) {
    const separatorCount = (line.match(/;/g) || []).length;
    if (separatorCount !== 1) {
      return {
        keys: [],
        error: `A linha "${line}" precisa conter exatamente um ";" (chave;valor).`,
      };
    }

    const [rawKey, rawValue] = line.split(';');
    const key = rawKey.trim();
    const value = rawValue.trim();

    if (!key || !value) {
      return {
        keys: [],
        error: `A linha "${line}" precisa ter chave e valor preenchidos.`,
      };
    }

    parsed.push({ key, value });
  }

  return { keys: parsed };
}

export default function useCadastroDeChaves() {
  const [systems, setSystems] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [namespaces, setNamespaces] = useState<string[]>([]);

  const [selectedSystem, setSelectedSystem] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedNamespace, setSelectedNamespace] = useState('');
  const [baseLanguage, setBaseLanguage] = useState('');
  const [rawText, setRawText] = useState('');

  const [loadingSystems, setLoadingSystems] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingNamespaces, setLoadingNamespaces] = useState(false);
  const [submittingKeys, setSubmittingKeys] = useState(false);
  const [submittingTranslations, setSubmittingTranslations] = useState(false);

  const selectedEnvironment = envConfig.devEnvironment;
  const isOnBaseLanguage = Boolean(selectedLanguage && baseLanguage && selectedLanguage === baseLanguage);

  const canSubmitKeys = useMemo(
    () => Boolean(selectedSystem && selectedLanguage && selectedNamespace && isOnBaseLanguage && rawText.trim().length > 0),
    [selectedSystem, selectedLanguage, selectedNamespace, isOnBaseLanguage, rawText],
  );

  const canSubmitTranslations = useMemo(
    () => Boolean(selectedSystem && selectedLanguage && selectedNamespace && rawText.trim().length > 0),
    [selectedSystem, selectedLanguage, selectedNamespace, rawText],
  );

  const loadSystems = useCallback(async () => {
    try {
      setLoadingSystems(true);
      const response = await getSystem().systemControllerGetSystemInfo();
      setSystems(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
    } catch {
      toast.error('Falha ao carregar sistemas.');
    } finally {
      setLoadingSystems(false);
    }
  }, []);

  const loadLanguages = useCallback(async (system: string) => {
    try {
      setLoadingLanguages(true);
      const [response, baseLanguageResponse] = await Promise.all([
        getLanguage().languageControllerGetSystemInfo(system, selectedEnvironment),
        getLanguage().languageControllerGetBaseLanguage(system, selectedEnvironment),
      ]);
      setLanguages(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
      setBaseLanguage(baseLanguageResponse?.data || '');
    } catch {
      toast.error('Falha ao carregar idiomas.');
    } finally {
      setLoadingLanguages(false);
    }
  }, [selectedEnvironment]);

  const loadNamespaces = useCallback(
    async (system: string, language: string) => {
      try {
        setLoadingNamespaces(true);
        const response = await getNamespace().namespaceControllerListNamespaces(system, selectedEnvironment, language);
        setNamespaces(normalizeStringList(response).sort((a, b) => a.localeCompare(b)));
      } catch {
        toast.error('Falha ao carregar namespaces.');
      } finally {
        setLoadingNamespaces(false);
      }
    },
    [selectedEnvironment],
  );

  useEffect(() => {
    void loadSystems();
  }, [loadSystems]);

  const handleSelectSystem = async (system: string) => {
    setSelectedSystem(system);
    setSelectedLanguage('');
    setSelectedNamespace('');
    setBaseLanguage('');
    setLanguages([]);
    setNamespaces([]);

    if (!system) {
      return;
    }

    await loadLanguages(system);
  };

  const handleSelectLanguage = async (language: string) => {
    setSelectedLanguage(language);
    setSelectedNamespace('');
    setNamespaces([]);

    if (!selectedSystem || !language) {
      return;
    }

    await loadNamespaces(selectedSystem, language);
  };

  const handleCreateKeys = async () => {
    if (!selectedSystem || !selectedLanguage || !selectedNamespace) {
      return;
    }
    if (!isOnBaseLanguage) {
      toast.error('Cadastro de chaves permitido apenas quando o idioma base estiver selecionado.');
      return;
    }

    const parsed = parseKeyLines(rawText);
    if (parsed.error) {
      toast.error(parsed.error);
      return;
    }

    try {
      setSubmittingKeys(true);
      await getTranslations().translationsControllerCreateNewKey({
        system: selectedSystem,
        namespace: selectedNamespace,
        keys: parsed.keys,
      });

      toast.success(`Chaves cadastradas com sucesso (${parsed.keys.length}).`);
      setRawText('');
    } catch {
      toast.error('Falha ao cadastrar chaves.');
    } finally {
      setSubmittingKeys(false);
    }
  };

  const handleCreateTranslations = async () => {
    if (!selectedSystem || !selectedLanguage || !selectedNamespace) {
      return;
    }

    const parsed = parseTranslationLines(rawText);
    if (parsed.error) {
      toast.error(parsed.error);
      return;
    }

    try {
      setSubmittingTranslations(true);
      await getTranslations().translationsControllerCreateTranslation({
        system: selectedSystem,
        namespace: selectedNamespace,
        language: selectedLanguage,
        keys: parsed.keys as unknown as string[],
      });

      toast.success(`Traduções cadastradas com sucesso (${parsed.keys.length}).`);
      setRawText('');
    } catch {
      toast.error('Falha ao cadastrar traduções.');
    } finally {
      setSubmittingTranslations(false);
    }
  };

  return {
    systems,
    languages,
    namespaces,
    selectedSystem,
    selectedLanguage,
    selectedNamespace,
    baseLanguage,
    isOnBaseLanguage,
    selectedEnvironment,
    rawText,
    loadingSystems,
    loadingLanguages,
    loadingNamespaces,
    submittingKeys,
    submittingTranslations,
    canSubmitKeys,
    canSubmitTranslations,
    setSelectedNamespace,
    setRawText,
    handleSelectSystem,
    handleSelectLanguage,
    handleCreateKeys,
    handleCreateTranslations,
  };
}
