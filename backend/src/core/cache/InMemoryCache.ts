import { Logger } from '@nestjs/common';

export class InMemoryCache {
  private cache = new Map<string, Record<string, any>>();
  private logger = new Logger(InMemoryCache.name);

  get(key: string) {
    this.logger.debug(`Cache get: ${key}`);
    return this.cache.get(key);
  }

  set(key: string, value: Record<string, any>) {
    this.logger.debug(`Cache set: ${key}`);
    this.cache.set(key, value);
  }

  delete(key: string) {
    this.logger.debug(`Cache delete: ${key}`);
    this.cache.delete(key);
  }

  deleteByPrefix(prefix: string) {
    this.logger.debug(`Cache delete by prefix: ${prefix}`);
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  deleteBySuffix(suffix: string) {
    this.logger.debug(`Cache delete by suffix: ${suffix}`);
    for (const key of this.cache.keys()) {
      if (key.endsWith(suffix)) {
        this.cache.delete(key);
      }
    }
  }

  clear() {
    this.logger.debug(`Cache clear`);
    this.cache.clear();
  }
}
