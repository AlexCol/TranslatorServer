import { useMemo, useState } from 'react';

type UseCreateNameOptions = {
  onCreate: (name: string) => Promise<void> | void;
};

export default function useSystemsSection({ onCreate }: UseCreateNameOptions) {
  const [newSystem, setNewSystem] = useState('');

  const canCreate = useMemo(() => newSystem.trim().length > 0, [newSystem]);

  const handleCreate = async () => {
    const parsed = newSystem.trim();
    if (!parsed) {
      return;
    }

    await onCreate(parsed);
    setNewSystem('');
  };

  return {
    newSystem,
    setNewSystem,
    canCreate,
    handleCreate,
  };
}
