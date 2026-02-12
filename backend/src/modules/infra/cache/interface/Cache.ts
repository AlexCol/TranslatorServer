export abstract class Cache {
  abstract get(key: string): Record<string, any> | undefined;
  abstract set(key: string, value: Record<string, any>): void;
  abstract delete(key: string): void;
  abstract deleteByPrefix(prefix: string): void;
  abstract clear(): void;
}
