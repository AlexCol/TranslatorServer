import { NamespaceDiagnostic } from './NamespaceDiagnostic';

export type LanguageDiagnostic = {
  language: string;
  isBase: boolean;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  namespaces: NamespaceDiagnostic[];
};
