import { Language, Namespace, Sistema } from './_Simples';

export type CatalogEntry = {
  sistema: Sistema;
  environment: string;
  language: Language;
  namespace: Namespace;
};
