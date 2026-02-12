import { Cache } from '../interface/Cache';

export class InMemoryCache implements Cache {
  private cache = new Map<string, string>();

  async get(key: string): Promise<string | undefined> {
    return this.cache.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    this.cache.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async getKeysByPrefix(prefix: string): Promise<string[]> {
    const keys: string[] = [];
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  }

  async delKey(key: string): Promise<void> {
    this.cache.delete(key);
  }
}
