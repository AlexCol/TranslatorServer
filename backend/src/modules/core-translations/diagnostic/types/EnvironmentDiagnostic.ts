import { LanguageDiagnostic } from './LanguageDiagnostic';

export type EnvironmentDiagnostic = {
  environment: string;
  baseLanguage: string | null;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  languages: LanguageDiagnostic[];
};
