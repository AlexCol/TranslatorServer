import { Injectable } from '@nestjs/common';
import { translationsCache } from '../core-translations.module';
import { SystemProvider } from '@/core/interfaces/SystemProvider';

@Injectable()
export class SystemService {
  constructor(private readonly provider: SystemProvider) {}

  async listSystems(): Promise<string[]> {
    return this.provider.listSystems();
  }

  async createSystem(system: string): Promise<void> {
    await this.provider.createSystem(system);
    translationsCache.clear(); // Clear cache after creating a new system
  }

  async deleteSystem(system: string): Promise<void> {
    await this.provider.deleteSystem(system);
    translationsCache.clear(); // Clear cache after deleting a system
  }
}
