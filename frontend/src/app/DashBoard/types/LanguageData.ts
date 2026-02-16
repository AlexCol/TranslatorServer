import type { NamespaceData } from './NamespaceData';

export type LanguageData = {
  language: string;
  isBase: boolean;
  totalTerms: number;
  translatedTerms: number;
  missingTerms: number;
  translatedPercentage: number;
  namespaces: NamespaceData[];
};
