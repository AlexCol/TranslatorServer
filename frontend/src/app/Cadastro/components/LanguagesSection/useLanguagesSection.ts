import { useMemo, useState } from 'react';

type UseCreateNameOptions = {
  onCreate: (name: string) => Promise<void> | void;
};

export default function useLanguagesSection({ onCreate }: UseCreateNameOptions) {
  const [newLanguage, setNewLanguage] = useState('');

  const canCreate = useMemo(() => newLanguage.trim().length > 0, [newLanguage]);

  const handleCreate = async () => {
    const parsed = newLanguage.trim();
    if (!parsed) {
      return;
    }

    await onCreate(parsed);
    setNewLanguage('');
  };

  return {
    newLanguage,
    setNewLanguage,
    canCreate,
    handleCreate,
  };
}
