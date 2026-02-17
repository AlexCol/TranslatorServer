import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, GlobeIcon } from 'lucide-react';
import { NamespaceRow } from '../NamespaceRow';
import languageRowStyles from './language-row.styles';
import { useLanguageRow } from './useLanguageRow';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import type { LanguageData } from '@/app/Dashboard/types';
import { BsBox, BsButton } from '@/components/singles/BaseComponents';
import presentLanguage from '@/lib/presentLanguage';

export type LanguageRowProps = {
  language: LanguageData;
  systemName: string;
  environmentName: string;
  availableEnvironments: string[];
  onRefresh: () => Promise<void>;
};

export function LanguageRow(props: LanguageRowProps) {
  const { language, systemName, environmentName, availableEnvironments, onRefresh } = props;
  const { expanded, setExpanded, actualPercentage, handleNamespaceClick } = useLanguageRow(props);

  return (
    <BsBox className={languageRowStyles.containerTC}>
      {/* -------------------------------------- */}
      {/* Cabecalho Clicavel */}
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
              {language.namespaces.map((namespace, i) => (
                <NamespaceRow
                  key={namespace.namespace}
                  namespace={namespace}
                  index={i}
                  onClick={handleNamespaceClick}
                  systemName={systemName}
                  environmentName={environmentName}
                  languageName={language.language}
                  availableEnvironments={availableEnvironments}
                  onRefresh={onRefresh}
                  isOnBaseLanguage={language.isBase}
                />
              ))}
            </BsBox>
          </motion.div>
        )}
      </AnimatePresence>
    </BsBox>
  );
}
