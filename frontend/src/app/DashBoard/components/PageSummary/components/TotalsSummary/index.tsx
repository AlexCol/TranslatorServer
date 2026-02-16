import { motion } from 'framer-motion';
import {
  ServerIcon,
  LayersIcon,
  GlobeIcon,
  FolderOpenIcon,
  FileTextIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from 'lucide-react';
import StatCard from './components/StatCard';
import totalSummaryStyles from './total-summary.styles';
import { ProgressBar } from '@/app/Dashboard/components/ProgressBar';
import type { TotalsData } from '@/app/Dashboard/types';
import { BsBox, BsText } from '@/components/singles/BaseComponents';

type TotalsSummaryProps = {
  totals: TotalsData;
};

export function TotalsSummary({ totals }: TotalsSummaryProps) {
  const actualPercentage = totals.totalTerms > 0 ? Math.round((totals.translatedTerms / totals.totalTerms) * 100) : 0;
  return (
    <BsBox className={totalSummaryStyles.containerTC}>
      <BsBox className={totalSummaryStyles.cardsContainerTC}>
        <StatCard icon={<ServerIcon size={14} />} label='Sistemas' value={totals.systems} index={0} />
        <StatCard icon={<LayersIcon size={14} />} label='Ambientes' value={totals.environments} index={1} />
        <StatCard icon={<GlobeIcon size={14} />} label='Idiomas' value={totals.languages} index={2} />
        <StatCard icon={<FolderOpenIcon size={14} />} label='Namespaces' value={totals.namespaces} index={3} />
        <StatCard icon={<FileTextIcon size={14} />} label='Total de Termos' value={totals.totalTerms} index={4} />
        <StatCard icon={<CheckCircle2Icon size={14} />} label='Traduzidos' value={totals.translatedTerms} index={5} />
        <StatCard icon={<XCircleIcon size={14} />} label='Faltando' value={totals.missingTerms} index={6} />
      </BsBox>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
        className={totalSummaryStyles.motionDiv}
      >
        <BsBox className={totalSummaryStyles.progresseBarTC}>
          <BsText as='span' className={totalSummaryStyles.coverageTC}>
            Overall Coverage
          </BsText>
          <BsText as='span' className={totalSummaryStyles.statsTC}>
            {totals.translatedTerms}
            <BsText as='span' className={totalSummaryStyles.statsHighlight}>
              {' '}
              /{' '}
            </BsText>
            {totals.totalTerms}
            <BsText as='span' className={totalSummaryStyles.statsSuffix}>
              terms
            </BsText>
          </BsText>
        </BsBox>
        <ProgressBar percentage={actualPercentage} size='lg' showLabel />
      </motion.div>
    </BsBox>
  );
}
