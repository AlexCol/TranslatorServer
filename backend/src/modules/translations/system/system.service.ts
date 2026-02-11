import { Injectable } from '@nestjs/common';
import { translationsCache } from '../translations.module';
import { SystemProvider } from '@/core/interfaces/SystemProvider';

@Injectable()
export class SystemService {
  constructor(private readonly provider: SystemProvider) {}

  async listSystems(): Promise<string[]> {
    return this.provider.listSystems();
  }

  async createSystem(sistema: string): Promise<void> {
    await this.provider.createSystem(sistema);
    translationsCache.clear(); // Clear cache after creating a new system
  }

  async deleteSystem(sistema: string): Promise<void> {
    await this.provider.deleteSystem(sistema);
    translationsCache.clear(); // Clear cache after deleting a system
  }
}
