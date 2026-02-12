import { Injectable } from '@nestjs/common';
import { Cache } from '../infra/cache/interface/Cache';

@Injectable()
export class TranslationsCacheService {
  private readonly cacheKeyPrefix = 'translations:';

  constructor(private readonly cache: Cache) {}

  get(key: string): Record<string, any> | undefined {
    return this.cache.get(this.cacheKeyPrefix + key);
  }

  set(key: string, value: Record<string, any>): void {
    this.cache.set(this.cacheKeyPrefix + key, value);
  }

  delete(key: string): void {
    this.cache.delete(this.cacheKeyPrefix + key);
  }

  deleteByPrefix(prefix: string): void {
    this.cache.deleteByPrefix(this.cacheKeyPrefix + prefix);
  }

  clear(): void {
    this.cache.deleteByPrefix(this.cacheKeyPrefix);
  }
}
