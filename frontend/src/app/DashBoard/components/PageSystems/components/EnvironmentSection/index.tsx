import { motion } from 'framer-motion';
import { LanguageRow } from './components/LanguageRow';
import environmentSectionStyles from './environment-section.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import { BsBox, BsText } from '@/components/singles/BaseComponents';
import { cn } from '@/lib/utils';
import type { EnvironmentDiagnostic } from '@/services/generated/models';

interface EnvironmentSectionProps {
  environment: EnvironmentDiagnostic;
  index: number;
}

export function EnvironmentSection({ environment, index }: EnvironmentSectionProps) {
  const actualPercentage =
    environment.totalTerms > 0 ? Math.round((environment.translatedTerms / environment.totalTerms) * 100) : 0;
  const dotColor =
    environment.environment === 'prod' ? environmentSectionStyles.dotProdTC : environmentSectionStyles.dotNonProdTC;
  const baseLanguageLabel = typeof environment.baseLanguage === 'string' ? environment.baseLanguage : '-';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.06 }}
      className={environmentSectionStyles.containerTC}
    >
      <BsBox className={environmentSectionStyles.headerTC}>
        <BsBox as='span' className={cn(environmentSectionStyles.dotTC, dotColor)} />
        <BsText as='span' className={environmentSectionStyles.nameTC}>
          {environment.environment}
        </BsText>
        <BsText as='span' className={environmentSectionStyles.badgeTC}>
          base: {baseLanguageLabel}
        </BsText>

        <BsBox className={environmentSectionStyles.summaryRowTC}>
          <BsBox className={environmentSectionStyles.statsTC}>
            <BsText as='span'>
              <BsText as='span' className={environmentSectionStyles.statsHighlightTC}>
                {environment.translatedTerms}
              </BsText>{' '}
              translated
            </BsText>
            <BsText as='span' className={environmentSectionStyles.statsDotTC}>
              |
            </BsText>
            <BsText as='span'>
              <BsText as='span' className={environmentSectionStyles.statsHighlightTC}>
                {environment.missingTerms}
              </BsText>{' '}
              missing
            </BsText>
          </BsBox>
          <BsBox className={environmentSectionStyles.progressWrapperTC}>
            <ProgressBar percentage={actualPercentage} size='sm' showLabel />
          </BsBox>
        </BsBox>
      </BsBox>

      <BsBox className={environmentSectionStyles.languagesTC}>
        {environment.languages.map((lang) => (
          <LanguageRow key={lang.language} language={lang} />
        ))}
      </BsBox>
    </motion.div>
  );
}
