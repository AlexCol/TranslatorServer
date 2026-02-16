import type { SystemData } from './SystemData';
import type { TotalsData } from './TotalsData';

export type TranslationOverview = {
  totals: TotalsData;
  systems: SystemData[];
};
