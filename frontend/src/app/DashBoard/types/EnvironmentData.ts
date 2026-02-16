import type { LanguageData } from './LanguageData';

export type EnvironmentData = {
  environment: string;
  baseLanguage: string;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  languages: LanguageData[];
};
