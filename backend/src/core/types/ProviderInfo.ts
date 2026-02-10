export type ProviderInfo = {
  type: string; // 'database', 'filesystem', 'bunny', etc
  version: string;
  maxKeyLength: number;
  maxValueLength: number;
  supportsBulkOperations: boolean;
  supportsVersioning: boolean;
};
