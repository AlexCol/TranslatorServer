import PageHeader from './components/PageHeader';
import PageSummary from './components/PageSummary';
import PageSystems from './components/PageSystems';
import dashboardStyles from './dashboard.styles';
import useDashboard from './usePageSystems';
import { BsBox } from '@/components/singles/BaseComponents';
import LoadingTailwind from '@/components/singles/LoadingTailwind';

export function Dashboard() {
  //https://www.magicpatterns.com/c/1sp2cj8pgoeupejckezalz

  const { data, refetch } = useDashboard();

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
        <PageSystems systems={data.systems} onRefresh={refetch} />
      </BsBox>
    </BsBox>
  );
}
