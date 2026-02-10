import { Environment } from '../types/_Simples';
import { CatalogEntry } from '../types/CatalogEntry';
import { KeyFilter } from '../types/KeyFilter';
import { LoadResult } from '../types/LoadResult';
import { ProviderInfo } from '../types/ProviderInfo';
import { PublishInfo } from '../types/PublishInfo';
import { SystemStatus } from '../types/SystemStatus';
import { TranslationStatus } from '../types/TranslationStatus';
import { ValidationResult } from '../types/ValidationResult';

export interface Provider {
  //!carrega o json da tradução
  loadWithFallBack(entry: CatalogEntry): Promise<LoadResult>;
  loadWithoutFallBack(entry: CatalogEntry): Promise<LoadResult>;

  //!sobre ambientes
  listEnvironments(): Promise<Environment[]>;
  createEnvironment(env: Environment): Promise<void>;
  deleteEnvironment(env: Environment): Promise<void>;

  //!sobre sistema
  listSystems(env: Environment, sistema: string): Promise<string[]>;
  createSystem(sistema: string, language: string): Promise<void>;
  deleteSystem(sistema: string, language: string): Promise<void>;

  //!sobre idiomas
  listLanguages(env: Environment, sistema: string): Promise<string[]>;
  createLanguage(sistema: string, language: string): Promise<void>;
  deleteLanguage(sistema: string, language: string): Promise<void>;

  //!sobre namespaces
  listNamespaces(env: Environment, sistema: string, language: string): Promise<string[]>;
  createNamespace(sistema: string, language: string, namespace: string): Promise<void>;
  deleteNamespace(sistema: string, language: string, namespace: string): Promise<void>;
  validateNamespace(entry: CatalogEntry): Promise<ValidationResult>;

  //!sobre chaves
  createKey(entry: CatalogEntry, key: string, value: string): Promise<void>;
  updateKey(entry: CatalogEntry, key: string, value: string): Promise<void>;
  deleteKey(entry: CatalogEntry, key: string): Promise<void>;
  searchKeys(entry: CatalogEntry, filter: KeyFilter): Promise<Record<string, string>>;

  //!publicação de namespaces
  publishNamespace(sistema: string, namespace: string, from: Environment, to: Environment): Promise<PublishInfo>;

  //!status e informações gerais
  getTranslationStatus(entry: CatalogEntry): Promise<TranslationStatus>;
  getProviderInfo(): Promise<ProviderInfo>;
  getStats(env: Environment, sistema: string): Promise<SystemStatus>;
}
