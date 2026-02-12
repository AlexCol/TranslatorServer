import { BunnyStorage } from './bunny/bunny-storage';
import envConfig from '@/env.config';

export function buildCdnPublisher() {
  const providerName = envConfig.cnd.provider;

  if (providerName === 'bunny') {
    const provider = new BunnyStorage(
      envConfig.cnd.bunny.key,
      envConfig.cnd.bunny.storageName,
      envConfig.cnd.bunny.translationsPath,
    );
    return provider;
  }

  throw new Error(`Unsupported CDN provider: ${providerName}`);
}
