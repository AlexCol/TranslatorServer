import { CatalogEntry, LoadResult, ProviderInfo, SystemStatus, TranslationStatus } from '../types';

export abstract class TranslationProvider {
  //!carrega o json da tradução
  abstract loadWithFallBack(entry: CatalogEntry): Promise<LoadResult>;
  abstract loadWithoutFallBack(entry: CatalogEntry): Promise<LoadResult>;

  //!sobre chaves
  abstract createKey(entry: CatalogEntry, key: string, value: string): Promise<void>;
  abstract createTranslation(entry: CatalogEntry, key: string, value: string): Promise<void>;
  abstract updateKey(entry: CatalogEntry, key: string, value: string): Promise<void>;
  abstract deleteKey(entry: CatalogEntry, key: string): Promise<void>;

  //!status e informações gerais
  abstract getTranslationStatus(entry: CatalogEntry): Promise<TranslationStatus>;
  abstract getProviderInfo(): Promise<ProviderInfo>;
  abstract getStats(env: string, sistema: string): Promise<SystemStatus>;
}
