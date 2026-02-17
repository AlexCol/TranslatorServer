import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import environmentSectionStyles from './environment-section.styles';
import type { EnvironmentSectionProps } from '.';
import { getPublisher } from '@/services/generated/publisher/publisher';

export function useEnvironmentSection(props: EnvironmentSectionProps) {
  const { environment, systemName, availableEnvironments, onRefresh } = props;
  const [isPublishAllModalOpen, setIsPublishAllModalOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('');
  const [isPublishingAll, setIsPublishingAll] = useState(false);

  const actualPercentage =
    environment.totalTerms > 0 ? Math.round((environment.translatedTerms / environment.totalTerms) * 100) : 0;
  const dotColor =
    environment.environment === 'prod' ? environmentSectionStyles.dotProdTC : environmentSectionStyles.dotNonProdTC;
  const baseLanguageLabel = typeof environment.baseLanguage === 'string' ? environment.baseLanguage : '-';
  const destinationEnvironments = useMemo(
    () => availableEnvironments.filter((item) => item !== environment.environment),
    [availableEnvironments, environment.environment],
  );

  const openPublishAllModal = () => {
    setSelectedEnvironment(destinationEnvironments[0] ?? '');
    setIsPublishAllModalOpen(true);
  };

  const closePublishAllModal = () => {
    if (isPublishingAll) {
      return;
    }

    setIsPublishAllModalOpen(false);
  };

  const handlePublishAll = async () => {
    if (!selectedEnvironment) {
      toast.error('Selecione o ambiente de destino.');
      return;
    }

    try {
      setIsPublishingAll(true);
      const response = await getPublisher().publisherControllerPublishAll({
        system: systemName,
        from: environment.environment,
        to: selectedEnvironment,
      });

      toast.success(response.data || 'Todos os namespaces do ambiente foram publicados com sucesso.');
      setIsPublishAllModalOpen(false);
      await onRefresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Falha ao publicar todos os namespaces do ambiente.';
      toast.error(message);
    } finally {
      setIsPublishingAll(false);
    }
  };

  return {
    isPublishAllModalOpen,
    selectedEnvironment,
    isPublishingAll,
    actualPercentage,
    dotColor,
    baseLanguageLabel,
    destinationEnvironments,
    openPublishAllModal,
    closePublishAllModal,
    handlePublishAll,
    setSelectedEnvironment,
  };
}
