import { motion } from 'framer-motion';
import { ArrowRightIcon, UploadIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import namespaceRowStyles from './namespace-row.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import type { LanguageData } from '@/app/Dashboard/types';
import { TSSelect, TSSelectOption } from '@/components/primitives';
import { BsBox, BsButton, BsText } from '@/components/singles/BaseComponents';
import { Modal } from '@/components/singles/Modal/Modal';
import { getPublisher } from '@/services/generated/publisher/publisher';

type NamespaceItem = LanguageData['namespaces'][number];

type NamespaceRowProps = {
  namespace: NamespaceItem;
  index: number;
  onClick: (namespace: string) => void;
  systemName: string;
  environmentName: string;
  languageName: string;
  availableEnvironments: string[];
  onRefresh: () => Promise<void>;
  isOnBaseLanguage: boolean;
};

export function NamespaceRow({
  namespace,
  index,
  onClick,
  systemName,
  environmentName,
  languageName,
  availableEnvironments,
  onRefresh,
  isOnBaseLanguage,
}: NamespaceRowProps) {
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15, delay: index * 0.04 }}
        className={namespaceRowStyles.namespaceRowTC}
      >
        <BsBox as='span' className={namespaceRowStyles.namespaceDotTC} />

        <BsBox
          as='span'
          className={namespaceRowStyles.namespaceNameTC}
          elementProps={{
            onClick: () => {
              onClick(namespace.namespace);
            },
          }}
        >
          {namespace.namespace}
        </BsBox>

        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={openPublishModal}
          className={namespaceRowStyles.publishButtonTC}
          buttonProps={{ disabled: destinationEnvironments.length === 0 }}
        >
          <UploadIcon size={12} /> {isOnBaseLanguage ? 'Publicar chaves' : 'Publicar tradução'}
        </BsButton>

        <BsBox className={namespaceRowStyles.namespaceProgressTC}>
          <ProgressBar percentage={namespacePercentage} size='sm' />
        </BsBox>

        <BsBox as='span' className={namespaceRowStyles.namespaceTotalTC}>
          {namespace.translatedTerms}/{namespace.totalTerms}
        </BsBox>
      </motion.div>

      {/* -------------------------------------- */}
      {/* Modal de publicação */}
      {/* -------------------------------------- */}
      <Modal isOpen={isPublishModalOpen} onClose={closePublishModal} className={namespaceRowStyles.modalWrapperTC}>
        <BsBox className={namespaceRowStyles.modalContentTC}>
          <BsText as='h3' className={namespaceRowStyles.modalTitleTC}>
            Publicar namespace
          </BsText>

          <BsBox className={namespaceRowStyles.modalMetaTC}>
            <BsText as='p' className={namespaceRowStyles.modalLineTC}>
              Namespace: <strong>{namespace.namespace}</strong>
            </BsText>
            <BsText as='p' className={namespaceRowStyles.modalLineTC}>
              Idioma: <strong>{languageName}</strong>
            </BsText>
            <BsText as='p' className={namespaceRowStyles.modalLineTC}>
              Origem: <strong>{environmentName}</strong>
            </BsText>
          </BsBox>

          <BsBox className={namespaceRowStyles.flowTC}>
            <BsText as='span' className={namespaceRowStyles.sourceBadgeTC}>
              {environmentName}
            </BsText>
            <ArrowRightIcon size={14} className={namespaceRowStyles.arrowTC} />
            <TSSelect
              value={selectedEnvironment}
              onChange={(event) => setSelectedEnvironment(event.target.value)}
              className={namespaceRowStyles.selectTC}
              disabled={destinationEnvironments.length === 0 || isPublishing}
            >
              {destinationEnvironments.length === 0 && (
                <TSSelectOption value=''>Sem destinos dispon�veis</TSSelectOption>
              )}
              {destinationEnvironments.map((environment) => (
                <TSSelectOption key={environment} value={environment}>
                  {environment}
                </TSSelectOption>
              ))}
            </TSSelect>
          </BsBox>

          <BsBox className={namespaceRowStyles.modalActionsTC}>
            <BsButton
              type='button'
              variants={{ variant: 'ghost' }}
              onClick={closePublishModal}
              buttonProps={{ disabled: isPublishing }}
            >
              Cancelar
            </BsButton>
            <BsButton
              type='button'
              onClick={handlePublish}
              buttonProps={{ disabled: !selectedEnvironment || isPublishing || destinationEnvironments.length === 0 }}
            >
              {isPublishing ? 'Publicando...' : 'Confirmar publicação'}
            </BsButton>
          </BsBox>
        </BsBox>
      </Modal>
    </>
  );
}
