import { Injectable } from '@nestjs/common';
import { translationsCache } from '../translations.module';
import { EnvironmentProvider } from '@/core/interfaces/EnvironmentProvider';

@Injectable()
export class EnvironmentService {
  constructor(private readonly provider: EnvironmentProvider) {}

  async listEnvironments(system: string): Promise<string[]> {
    return this.provider.listEnvironments(system);
  }

  async createEnvironment(system: string, environment: string): Promise<void> {
    await this.provider.createEnvironment(system, environment);
    translationsCache.deleteByPrefix(`${system}:${environment}:`);
  }

  async deleteEnvironment(system: string, environment: string): Promise<void> {
    await this.provider.deleteEnvironment(system, environment);
    translationsCache.deleteByPrefix(`${system}:${environment}:`);
  }
}
