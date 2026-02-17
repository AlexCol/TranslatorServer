import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, GlobeIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import languageRowStyles from './language-row.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import type { LanguageData } from '@/app/Dashboard/types';
import { BsBox, BsButton } from '@/components/singles/BaseComponents';
import presentLanguage from '@/lib/presentLanguage';

export type LanguageRowProps = {
  language: LanguageData;
  systemName: string;
  environmentName: string;
};

export function LanguageRow({ language, systemName, environmentName }: LanguageRowProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const actualPercentage =
    language.totalTerms > 0 ? Math.round((language.translatedTerms / language.totalTerms) * 100) : 0;

  const handleNamespaceClick = (namespace: string) => {
    void navigate(`/traducoes/${systemName}/${environmentName}/${language.language}/${namespace}`);
  };

  return (
    <BsBox className={languageRowStyles.containerTC}>
      {/* -------------------------------------- */}
      {/* Cabeçalho Clicavel */}
      {/* -------------------------------------- */}
      <BsButton
        type='button'
        variants={{ variant: 'ghost' }}
        onClick={() => setExpanded(!expanded)}
        className={languageRowStyles.buttonTC}
      >
        {/* chevron */}
        <motion.span
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.15 }}
          className={languageRowStyles.iconTC}
        >
          <ChevronRightIcon size={12} />
        </motion.span>

        {/* icone de globo */}
        <GlobeIcon size={13} className={languageRowStyles.iconTC} />

        {/* Nome do idioma */}
        <BsBox as='span' className={languageRowStyles.languageTC}>
          {presentLanguage(language.language)}
          {language.isBase && (
            <BsBox as='span' className={languageRowStyles.baseTC}>
              base
            </BsBox>
          )}
        </BsBox>

        {/* Barra de progresso */}
        <BsBox className={languageRowStyles.percentageTC}>
          <ProgressBar percentage={actualPercentage} size='sm' />
        </BsBox>

        {/* percentual */}
        <BsBox as='span' className={languageRowStyles.actualPercentageTC}>
          {actualPercentage}%
        </BsBox>

        {/* total */}
        <BsBox as='span' className={languageRowStyles.totalTC}>
          {language.translatedTerms}/{language.totalTerms}
        </BsBox>
      </BsButton>

      {/* -------------------------------------- */}
      {/* Namespaces */}
      {/* -------------------------------------- */}
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
                    {/* pontinho - como que mostrar lista */}
                    <BsBox as='span' className={languageRowStyles.namespaceDotTC} />

                    {/* Label do namespace, clicavel */}
                    <BsBox
                      as='span'
                      className={languageRowStyles.namespaceNameTC}
                      elementProps={{
                        onClick: () => {
                          handleNamespaceClick(ns.namespace);
                        },
                      }}
                    >
                      {ns.namespace}
                    </BsBox>

                    {/* Barra de progresso */}
                    <BsBox className={languageRowStyles.namespaceProgressTC}>
                      <ProgressBar percentage={nsPercentage} size='sm' />
                    </BsBox>
                    {/* Total */}
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
