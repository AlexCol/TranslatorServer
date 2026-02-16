import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, ServerIcon } from 'lucide-react';
import { useState } from 'react';
import { EnvironmentSection } from '../EnvironmentSection';
import systemCardStyles from './system-card.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import { BsBox, BsButton, BsText } from '@/components/singles/BaseComponents';
import BsHeading from '@/components/singles/BaseComponents/BsHeading/BsHeading';
import type { SystemDiagnostic } from '@/services/generated/models';

interface SystemCardProps {
  system: SystemDiagnostic;
  index: number;
}
export function SystemCard({ system, index }: SystemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const actualPercentage = system.totalTerms > 0 ? Math.round((system.translatedTerms / system.totalTerms) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 + index * 0.1 }}
      className={systemCardStyles.externalMotionDiv}
    >
      {/* System header — clickable */}
      <BsButton
        type='button'
        variants={{ variant: 'ghost' }}
        onClick={() => setExpanded(!expanded)}
        className={systemCardStyles.buttonTC}
      >
        <BsBox className={systemCardStyles.innetButtonTC}>
          <ServerIcon size={16} className={systemCardStyles.buttonIconTC} />
        </BsBox>

        <BsBox className={systemCardStyles.contentTC}>
          <BsBox className={systemCardStyles.titleRowTC}>
            <BsHeading as='h3' className={systemCardStyles.titleTC}>
              {system.system}
            </BsHeading>
            <BsBox as='span' className={systemCardStyles.envCountTC}>
              {system.environments.length} env
              {system.environments.length !== 1 ? 's' : ''}
            </BsBox>
          </BsBox>
          <BsBox className={systemCardStyles.progressRowTC}>
            <BsBox className={systemCardStyles.progressTC}>
              <ProgressBar percentage={actualPercentage} size='md' />
            </BsBox>
            <BsBox as='span' className={systemCardStyles.percentageTC}>
              {actualPercentage}%
            </BsBox>
          </BsBox>
        </BsBox>

        <BsBox className={systemCardStyles.metricsTC}>
          <BsBox className={systemCardStyles.metricBlockTC}>
            <BsText as='p' className={systemCardStyles.metricLabelTC}>
              translated
            </BsText>
            <BsText as='p' className={systemCardStyles.metricValueTC}>
              {system.translatedTerms}
              <BsBox as='span' className={systemCardStyles.metricDividerTC}>
                {' '}
                / {system.totalTerms}
              </BsBox>
            </BsText>
          </BsBox>
          <BsBox className={systemCardStyles.metricBlockTC}>
            <BsText as='p' className={systemCardStyles.metricLabelTC}>
              missing
            </BsText>
            <BsText as='p' className={systemCardStyles.missingValueTC}>
              {system.missingTerms}
            </BsText>
          </BsBox>
          <motion.span
            animate={{
              rotate: expanded ? 180 : 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className={systemCardStyles.chevronTC}
          >
            <ChevronDownIcon size={18} />
          </motion.span>
        </BsBox>
      </BsButton>

      {/* Expanded environments */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={systemCardStyles.expandedMotionTC}
          >
            <BsBox className={systemCardStyles.expandedContentTC}>
              {system.environments.map((env, i) => (
                <EnvironmentSection key={env.environment} environment={env} index={i} />
              ))}
            </BsBox>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
