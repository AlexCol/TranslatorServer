import { motion } from 'framer-motion';
import { ArrowRightIcon, UploadIcon } from 'lucide-react';
import { LanguageRow } from '../LanguageRow';
import environmentSectionStyles from './environment-section.styles';
import { useEnvironmentSection } from './use.EnvironmentSection';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import { TSSelect, TSSelectOption } from '@/components/primitives';
import { BsBox, BsButton, BsText } from '@/components/singles/BaseComponents';
import { Modal } from '@/components/singles/Modal/Modal';
import { cn } from '@/lib/utils';
import type { EnvironmentDiagnostic } from '@/services/generated/models';

export type EnvironmentSectionProps = {
  environment: EnvironmentDiagnostic;
  index: number;
  systemName: string;
  availableEnvironments: string[];
  onRefresh: () => Promise<void>;
};

export function EnvironmentSection(props: EnvironmentSectionProps) {
  const { environment, index, systemName, availableEnvironments, onRefresh } = props;
  const states = useEnvironmentSection(props);
  const { actualPercentage, dotColor, baseLanguageLabel, destinationEnvironments } = states;
  const { isPublishAllModalOpen, selectedEnvironment, isPublishingAll } = states;
  const { openPublishAllModal, closePublishAllModal, handlePublishAll, setSelectedEnvironment } = states;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      className={environmentSectionStyles.containerTC}
    >
      <BsBox className={environmentSectionStyles.headerTC}>
        {/* ponto de acordo com ambiente */}
        <BsBox as='span' className={cn(environmentSectionStyles.dotTC, dotColor)} />

        {/* nome do ambiente */}
        <BsText as='span' className={environmentSectionStyles.nameTC}>
          {environment.environment}
        </BsText>

        {/* label informando o idioma base do ambiente */}
        <BsText as='span' className={environmentSectionStyles.badgeTC}>
          base: {baseLanguageLabel}
        </BsText>

        <BsButton
          type='button'
          variants={{ variant: 'outline' }}
          onClick={openPublishAllModal}
          className={environmentSectionStyles.publishAllButtonTC}
          buttonProps={{ disabled: destinationEnvironments.length === 0 }}
        >
          <UploadIcon size={12} /> Publicar ambiente
        </BsButton>

        {/* -------------------------------------- */}
        {/* Labels de Translated e Missing e progresso */}
        {/* -------------------------------------- */}
        <BsBox className={environmentSectionStyles.summaryRowTC}>
          <BsBox className={environmentSectionStyles.statsTC}>
            {/* translated */}
            <BsText as='span'>
              <BsText as='span' className={environmentSectionStyles.statsHighlightTC}>
                {environment.translatedTerms}
              </BsText>{' '}
              translated
            </BsText>
            <BsText as='span' className={environmentSectionStyles.statsDotTC}>
              |
            </BsText>
            {/* missing */}
            <BsText as='span'>
              <BsText as='span' className={environmentSectionStyles.statsHighlightTC}>
                {environment.missingTerms}
              </BsText>{' '}
              missing
            </BsText>
          </BsBox>
          {/* barra de progresso */}
          <BsBox className={environmentSectionStyles.progressWrapperTC}>
            <ProgressBar percentage={actualPercentage} size='sm' showLabel />
          </BsBox>
        </BsBox>
      </BsBox>

      {/* Chamando componente LanguageRow */}
      <BsBox className={environmentSectionStyles.languagesTC}>
        {environment.languages.map((lang) => (
          <LanguageRow
            key={lang.language}
            language={lang}
            systemName={systemName}
            environmentName={environment.environment}
            availableEnvironments={availableEnvironments}
            onRefresh={onRefresh}
          />
        ))}
      </BsBox>

      <Modal
        isOpen={isPublishAllModalOpen}
        onClose={closePublishAllModal}
        className={environmentSectionStyles.modalWrapperTC}
      >
        <BsBox className={environmentSectionStyles.modalContentTC}>
          <BsText as='h3' className={environmentSectionStyles.modalTitleTC}>
            Publicar todos namespaces do ambiente
          </BsText>

          <BsBox className={environmentSectionStyles.modalMetaTC}>
            <BsText as='p' className={environmentSectionStyles.modalLineTC}>
              Sistema: <strong>{systemName}</strong>
            </BsText>
            <BsText as='p' className={environmentSectionStyles.modalLineTC}>
              Origem: <strong>{environment.environment}</strong>
            </BsText>
          </BsBox>

          <BsBox className={environmentSectionStyles.flowTC}>
            <BsText as='span' className={environmentSectionStyles.sourceBadgeTC}>
              {environment.environment}
            </BsText>
            <ArrowRightIcon size={14} className={environmentSectionStyles.arrowTC} />
            <TSSelect
              value={selectedEnvironment}
              onChange={(event) => setSelectedEnvironment(event.target.value)}
              className={environmentSectionStyles.selectTC}
              disabled={destinationEnvironments.length === 0 || isPublishingAll}
            >
              {destinationEnvironments.length === 0 && (
                <TSSelectOption value=''>Sem ambientes de destino disponiveis</TSSelectOption>
              )}
              {destinationEnvironments.map((environmentName) => (
                <TSSelectOption key={environmentName} value={environmentName}>
                  {environmentName}
                </TSSelectOption>
              ))}
            </TSSelect>
          </BsBox>

          <BsBox className={environmentSectionStyles.modalActionsTC}>
            <BsButton
              type='button'
              variants={{ variant: 'ghost' }}
              onClick={closePublishAllModal}
              buttonProps={{ disabled: isPublishingAll }}
            >
              Cancelar
            </BsButton>
            <BsButton
              type='button'
              onClick={handlePublishAll}
              buttonProps={{
                disabled: !selectedEnvironment || isPublishingAll || destinationEnvironments.length === 0,
              }}
            >
              {isPublishingAll ? 'Publicando...' : 'Confirmar publicacao'}
            </BsButton>
          </BsBox>
        </BsBox>
      </Modal>
    </motion.div>
  );
}
