import { motion } from 'framer-motion';
import namespaceRowStyles from './namespace-row.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import type { LanguageData } from '@/app/Dashboard/types';
import { BsBox } from '@/components/singles/BaseComponents';

type NamespaceItem = LanguageData['namespaces'][number];

type NamespaceRowProps = {
  namespace: NamespaceItem;
  index: number;
  onClick: (namespace: string) => void;
};

export function NamespaceRow({ namespace, index, onClick }: NamespaceRowProps) {
  const namespacePercentage =
    namespace.totalTerms > 0 ? Math.round((namespace.translatedTerms / namespace.totalTerms) * 100) : 0;

  return (
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

      <BsBox className={namespaceRowStyles.namespaceProgressTC}>
        <ProgressBar percentage={namespacePercentage} size='sm' />
      </BsBox>

      <BsBox as='span' className={namespaceRowStyles.namespaceTotalTC}>
        {namespace.translatedTerms}/{namespace.totalTerms}
      </BsBox>
    </motion.div>
  );
}
