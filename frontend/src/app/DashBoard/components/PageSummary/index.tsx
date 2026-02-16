import type { TotalsData } from '../../types';
import { TotalsSummary } from './components/TotalsSummary';
import pageSummaryStyles from './page-summary.styles';
import { BsBox } from '@/components/singles/BaseComponents';

interface PageSummaryProps {
  totals: TotalsData;
}

function PageSummary({ totals }: PageSummaryProps) {
  return (
    <BsBox as='section' className={pageSummaryStyles.sectionTC} aria-label='Summary statistics'>
      <TotalsSummary totals={totals} />
    </BsBox>
  );
}

export default PageSummary;
