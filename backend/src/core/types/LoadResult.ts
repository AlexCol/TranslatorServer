import { Environment } from './_Simples';

export type LoadResult = {
  data: Record<string, any>;
  metadata: {
    namespace: string;
    language: string;
    environment: Environment;
    loadedAt: Date;
    hasContent: boolean;
  };
};
