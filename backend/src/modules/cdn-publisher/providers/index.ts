import { BunnyStorage } from './bunny/bunny-storage';
import envConfig from '@/env.config';

export function buildCdnPublisher() {
  const providerName = envConfig.cdn.provider;

  if (providerName === 'bunny') {
    const provider = new BunnyStorage(
      envConfig.cdn.bunny.key,
      envConfig.cdn.bunny.storageName,
      envConfig.cdn.bunny.translationsPath,
    );
    return provider;
  }

  throw new Error(`Unsupported CDN provider: ${providerName}`);
}
