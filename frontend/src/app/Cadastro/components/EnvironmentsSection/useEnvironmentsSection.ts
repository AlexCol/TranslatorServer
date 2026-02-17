import { useMemo, useState } from 'react';

type UseCreateNameOptions = {
  onCreate: (name: string) => Promise<void> | void;
};

export default function useEnvironmentsSection({ onCreate }: UseCreateNameOptions) {
  const [newEnvironment, setNewEnvironment] = useState('');

  const canCreate = useMemo(() => newEnvironment.trim().length > 0, [newEnvironment]);

  const handleCreate = async () => {
    const parsed = newEnvironment.trim();
    if (!parsed) {
      return;
    }

    await onCreate(parsed);
    setNewEnvironment('');
  };

  return {
    newEnvironment,
    setNewEnvironment,
    canCreate,
    handleCreate,
  };
}
