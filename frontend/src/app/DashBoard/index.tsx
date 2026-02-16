import dashboardStyles from './dashboard.styles';
import PageHeader from './PageParts/PageHeader';
import PageSummary from './PageParts/PageSummary';
import PageSystems from './PageParts/PageSystems';
import useDashboard from './usePageSystems';
import { BsBox } from '@/components/singles/BaseComponents';
import LoadingTailwind from '@/components/singles/LoadingTailwind';

export function Dashboard() {
  //https://www.magicpatterns.com/c/1sp2cj8pgoeupejckezalz

  const { data } = useDashboard();

  if (!data) {
    return <LoadingTailwind />;
  }

  return (
    <BsBox as='main' className={dashboardStyles.pageTC}>
      <BsBox className={dashboardStyles.contentTC}>
        {/* Page header */}
        <PageHeader />

        {/* Totals summary */}

        <PageSummary totals={data.totals} />

        {/* Systems */}
        <PageSystems systems={data.systems} />
      </BsBox>
    </BsBox>
  );
}
