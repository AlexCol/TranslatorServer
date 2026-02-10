import { Environment, Language, Namespace, Sistema } from './_Simples';

export type CatalogEntry = {
  sistema: Sistema;
  namespace: Namespace;
  language: Language;
  environment: Environment;
};
