import { Injectable } from '@nestjs/common';
import { EnvironmentProvider } from '@/core/interfaces/EnvironmentProvider';
import { Cache } from '@/modules/infra/cache/interface/Cache';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly cache: Cache,
    private readonly provider: EnvironmentProvider,
  ) {}

  async listEnvironments(system: string): Promise<string[]> {
    return this.provider.listEnvironments(system);
  }

  async createEnvironment(system: string, environment: string): Promise<void> {
    await this.provider.createEnvironment(system, environment);
    this.cache.deleteByPrefix(`${system}:${environment}:`);
  }

  async deleteEnvironment(system: string, environment: string): Promise<void> {
    await this.provider.deleteEnvironment(system, environment);
    this.cache.deleteByPrefix(`${system}:${environment}:`);
  }
}
