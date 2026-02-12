import { Type } from '@nestjs/common';
import { AuthProvider } from '../interfaces/AuthProvider';
import { MockAuthProvider } from './Mock/MockProvider';
import { RedmineAuthProvider } from './Redmine/RedmineAuthProvider';
import envConfig from '@/env.config';

export function buildAuthProvider() {
  const providers = new Map<string, Type<AuthProvider>>([
    ['redmine', RedmineAuthProvider],
    ['mock', MockAuthProvider],
  ]);

  const providerName = envConfig.auth.provider;
  const ProviderClass = providers.get(providerName);

  if (ProviderClass) {
    return new ProviderClass();
  }
  throw new Error(`Unsupported auth provider: ${providerName}`);
}
