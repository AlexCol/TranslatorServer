import { Injectable, Logger } from '@nestjs/common';
import { translationsCache } from '../core-translations.module';
import { TranslationProvider } from '@/core/interfaces/TranslationProvider';
import { CatalogEntry } from '@/core/types';

@Injectable()
export class TranslationsService {
  private readonly logger = new Logger(TranslationsService.name);

  constructor(private readonly provider: TranslationProvider) {}

  async loadWithFallBack(entry: CatalogEntry): Promise<Record<string, any>> {
    const cacheKey = `${entry.sistema}:${entry.environment}:${entry.language}:${entry.namespace}`;

    let json = translationsCache.get(cacheKey);
    if (json) {
      this.logger.debug(`Cache hit for ${cacheKey}`);
      return json;
    }

    json = await this.provider.loadWithFallBack(entry);
    this.logger.debug(`Cache miss for ${cacheKey}`);
    translationsCache.set(cacheKey, json);

    return json;
  }

  async loadWithoutFallBack(entry: CatalogEntry): Promise<Record<string, any>> {
    const cacheKey = `${entry.sistema}:${entry.environment}:${entry.language}:${entry.namespace}:clean`;

    let json = translationsCache.get(cacheKey);
    if (json) {
      this.logger.debug(`Cache hit for ${cacheKey}`);
      return json;
    }

    json = await this.provider.loadWithoutFallBack(entry);
    this.logger.debug(`Cache miss for ${cacheKey}`);
    translationsCache.set(cacheKey, json);

    return json;
  }

  async createKey(system: string, namespace: string, key: string, value: string): Promise<void> {
    const newKeyCatalog = {
      sistema: system,
      environment: 'dev',
      language: '',
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.createKey(newKeyCatalog, key, value);
    translationsCache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async createTranslation(system: string, language: string, namespace: string, key: string, value: string) {
    const entry = {
      sistema: system,
      environment: 'dev',
      language: language,
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.createTranslation(entry, key, value);
    translationsCache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async updateKey(system: string, language: string, namespace: string, key: string, value: string): Promise<void> {
    const entry = {
      sistema: system,
      environment: 'dev',
      language: language,
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.updateKey(entry, key, value);
    translationsCache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async deleteKey(system: string, namespace: string, key: string): Promise<void> {
    const entry = {
      sistema: system,
      environment: 'dev',
      language: '',
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.deleteKey(entry, key);
    translationsCache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async getTranslationStatus(entry: CatalogEntry): Promise<Record<string, any>> {
    return await this.provider.getTranslationStatus(entry);
  }
}
