import { useMemo, useState } from 'react';

type UseCreateNameOptions = {
  onCreate: (name: string) => Promise<void> | void;
};

export default function useNamespacesSection({ onCreate }: UseCreateNameOptions) {
  const [newNamespace, setNewNamespace] = useState('');

  const canCreate = useMemo(() => newNamespace.trim().length > 0, [newNamespace]);

  const handleCreate = async () => {
    const parsed = newNamespace.trim();
    if (!parsed) {
      return;
    }

    await onCreate(parsed);
    setNewNamespace('');
  };

  return {
    newNamespace,
    setNewNamespace,
    canCreate,
    handleCreate,
  };
}
