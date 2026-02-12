import { Injectable, Logger } from '@nestjs/common';
import { TranslationProvider } from '@/core/interfaces/TranslationProvider';
import { CatalogEntry } from '@/core/types';
import { Cache } from '@/modules/infra/cache/interface/Cache';

@Injectable()
export class TranslationsService {
  private readonly logger = new Logger(TranslationsService.name);

  constructor(
    private readonly cache: Cache,
    private readonly provider: TranslationProvider,
  ) {}

  async loadWithFallBack(entry: CatalogEntry): Promise<Record<string, any>> {
    const cacheKey = `${entry.system}:${entry.environment}:${entry.language}:${entry.namespace}`;

    let json = this.cache.get(cacheKey);
    if (json) {
      this.logger.debug(`Cache hit for ${cacheKey}`);
      return json;
    }

    json = await this.provider.loadWithFallBack(entry);
    this.logger.debug(`Cache miss for ${cacheKey}`);
    this.cache.set(cacheKey, json);

    return json;
  }

  async loadWithoutFallBack(entry: CatalogEntry): Promise<Record<string, any>> {
    const cacheKey = `${entry.system}:${entry.environment}:${entry.language}:${entry.namespace}:clean`;

    let json = this.cache.get(cacheKey);
    if (json) {
      this.logger.debug(`Cache hit for ${cacheKey}`);
      return json;
    }

    json = await this.provider.loadWithoutFallBack(entry);
    this.logger.debug(`Cache miss for ${cacheKey}`);
    this.cache.set(cacheKey, json);

    return json;
  }

  async createKey(system: string, namespace: string, key: string, value: string): Promise<void> {
    const newKeyCatalog = {
      system: system,
      environment: 'dev',
      language: '',
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.createKey(newKeyCatalog, key, value);
    this.cache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async createTranslation(system: string, language: string, namespace: string, key: string, value: string) {
    const entry = {
      system: system,
      environment: 'dev',
      language: language,
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.createTranslation(entry, key, value);
    this.cache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async updateKey(system: string, language: string, namespace: string, key: string, value: string): Promise<void> {
    const entry = {
      system: system,
      environment: 'dev',
      language: language,
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.updateKey(entry, key, value);
    this.cache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async deleteKey(system: string, namespace: string, key: string): Promise<void> {
    const entry = {
      system: system,
      environment: 'dev',
      language: '',
      namespace: namespace,
    } satisfies CatalogEntry;
    const result = await this.provider.deleteKey(entry, key);
    this.cache.deleteByPrefix(`${system}:dev`); //limpa cache para forçar recarregamento das traduções
    return result;
  }

  async getTranslationStatus(entry: CatalogEntry): Promise<Record<string, any>> {
    return await this.provider.getTranslationStatus(entry);
  }
}
