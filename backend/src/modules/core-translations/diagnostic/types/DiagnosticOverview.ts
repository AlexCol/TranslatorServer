import { SystemDiagnostic } from './SystemDiagnostic';

export type DiagnosticOverview = {
  totals: {
    systems: number;
    environments: number;
    languages: number;
    namespaces: number;
    totalTerms: number;
    translatedTerms: number;
    missingTerms: number;
    translatedPercentage: number;
  };
  systems: SystemDiagnostic[];
};
