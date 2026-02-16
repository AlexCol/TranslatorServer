import type { EnvironmentData } from './EnvironmentData';

export type SystemData = {
  system: string;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  environments: EnvironmentData[];
};
