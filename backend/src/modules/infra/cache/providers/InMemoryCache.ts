import { Logger } from '@nestjs/common';
import { Cache } from '../interface/Cache';

export class InMemoryCache implements Cache {
  private cache = new Map<string, Record<string, any>>();
  private logger = new Logger(InMemoryCache.name);

  get(key: string): Record<string, any> | undefined {
    //this.logger.debug(`Cache get: ${key}`);
    return this.cache.get(key);
  }

  set(key: string, value: Record<string, any>): void {
    //this.logger.debug(`Cache set: ${key}`);
    this.cache.set(key, value);
  }

  delete(key: string): void {
    //this.logger.debug(`Cache delete: ${key}`);
    this.cache.delete(key);
  }

  deleteByPrefix(prefix: string): void {
    //this.logger.debug(`Cache delete by prefix: ${prefix}`);
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  clear(): void {
    //this.logger.debug(`Cache clear`);
    this.cache.clear();
  }
}
