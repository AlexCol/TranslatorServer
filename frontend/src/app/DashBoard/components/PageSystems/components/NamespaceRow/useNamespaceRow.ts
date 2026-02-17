import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { NamespaceRowProps } from '.';
import { getPublisher } from '@/services/generated/publisher/publisher';

export function useNamespaceRow(props: NamespaceRowProps) {
  const { namespace, environmentName, availableEnvironments, systemName, languageName, onRefresh } = props;

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const namespacePercentage =
    namespace.totalTerms > 0 ? Math.round((namespace.translatedTerms / namespace.totalTerms) * 100) : 0;

  const destinationEnvironments = useMemo(
    () => availableEnvironments.filter((environment) => environment !== environmentName),
    [availableEnvironments, environmentName],
  );

  const openPublishModal = () => {
    setSelectedEnvironment(destinationEnvironments[0] ?? '');
    setIsPublishModalOpen(true);
  };

  const closePublishModal = () => {
    if (isPublishing) {
      return;
    }

    setIsPublishModalOpen(false);
  };

  const handlePublish = async () => {
    if (!selectedEnvironment) {
      toast.error('Selecione o ambiente de destino.');
      return;
    }

    try {
      setIsPublishing(true);
      const response = await getPublisher().publisherControllerPublishNamespace({
        system: systemName,
        language: languageName,
        namespace: namespace.namespace,
        from: environmentName,
        to: selectedEnvironment,
      });

      toast.success(response.data || 'Namespace publicado com sucesso.');
      setIsPublishModalOpen(false);
      await onRefresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao publicar namespace.';
      toast.error(message);
    } finally {
      setIsPublishing(false);
    }
  };

  return {
    namespacePercentage,
    destinationEnvironments,
    isPublishModalOpen,
    selectedEnvironment,
    setSelectedEnvironment,
    isPublishing,
    openPublishModal,
    closePublishModal,
    handlePublish,
  };
}
