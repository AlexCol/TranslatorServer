import { EnvironmentDiagnostic } from './EnvironmentDiagnostic';

export type SystemDiagnostic = {
  system: string;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  environments: EnvironmentDiagnostic[];
};
