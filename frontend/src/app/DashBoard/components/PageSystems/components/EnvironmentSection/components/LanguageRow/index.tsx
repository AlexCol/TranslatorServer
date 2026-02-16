import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, GlobeIcon } from 'lucide-react';
import { useState } from 'react';
import languageRowStyles from './language-row.styles';
import type { LanguageRowProps } from './types/LanguageRowProps';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import { BsBox, BsButton } from '@/components/singles/BaseComponents';
import presentLanguage from '@/lib/presentLanguage';

export function LanguageRow({ language }: LanguageRowProps) {
  const [expanded, setExpanded] = useState(false);
  const actualPercentage =
    language.totalTerms > 0 ? Math.round((language.translatedTerms / language.totalTerms) * 100) : 0;
  return (
    <BsBox className={languageRowStyles.containerTC}>
      <BsButton
        type='button'
        variants={{ variant: 'ghost' }}
        onClick={() => setExpanded(!expanded)}
        className={languageRowStyles.buttonTC}
      >
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className={languageRowStyles.iconTC}
        >
          <ChevronRightIcon size={12} />
        </motion.span>

        <GlobeIcon size={13} className={languageRowStyles.iconTC} />

        <BsBox as='span' className={languageRowStyles.languageTC}>
          {presentLanguage(language.language)}
          {language.isBase && (
            <BsBox as='span' className={languageRowStyles.baseTC}>
              base
            </BsBox>
          )}
        </BsBox>

        <BsBox className={languageRowStyles.percentageTC}>
          <ProgressBar percentage={actualPercentage} size='sm' />
        </BsBox>

        <BsBox as='span' className={languageRowStyles.actualPercentageTC}>
          {actualPercentage}%
        </BsBox>

        <BsBox as='span' className={languageRowStyles.totalTC}>
          {language.translatedTerms}/{language.totalTerms}
        </BsBox>
      </BsButton>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={languageRowStyles.expandMotionTC}
          >
            <BsBox className={languageRowStyles.expandContentTC}>
              {language.namespaces.map((ns, i) => {
                const nsPercentage = ns.totalTerms > 0 ? Math.round((ns.translatedTerms / ns.totalTerms) * 100) : 0;
                return (
                  <motion.div
                    key={ns.namespace}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.04 }}
                    className={languageRowStyles.namespaceRowTC}
                  >
                    <BsBox as='span' className={languageRowStyles.namespaceDotTC} />
                    <BsBox
                      as='span'
                      className={languageRowStyles.namespaceNameTC}
                      elementProps={{
                        onClick: () => {
                          alert('naveg');
                        },
                      }}
                    >
                      {ns.namespace}
                    </BsBox>
                    <BsBox className={languageRowStyles.namespaceProgressTC}>
                      <ProgressBar percentage={nsPercentage} size='sm' />
                    </BsBox>
                    <BsBox as='span' className={languageRowStyles.namespaceTotalTC}>
                      {ns.translatedTerms}/{ns.totalTerms}
                    </BsBox>
                  </motion.div>
                );
              })}
            </BsBox>
          </motion.div>
        )}
      </AnimatePresence>
    </BsBox>
  );
}
