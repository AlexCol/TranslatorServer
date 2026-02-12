import { Injectable } from '@nestjs/common';
import { SystemProvider } from '@/core/interfaces/SystemProvider';
import { Cache } from '@/modules/infra/cache/interface/Cache';

@Injectable()
export class SystemService {
  constructor(
    private readonly cache: Cache,
    private readonly provider: SystemProvider,
  ) {}

  async listSystems(): Promise<string[]> {
    return this.provider.listSystems();
  }

  async createSystem(system: string): Promise<void> {
    await this.provider.createSystem(system);
    this.cache.clear(); // Clear cache after creating a new system
  }

  async deleteSystem(system: string): Promise<void> {
    await this.provider.deleteSystem(system);
    this.cache.clear(); // Clear cache after deleting a system
  }
}
