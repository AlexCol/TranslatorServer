import { BadRequestException, Injectable } from '@nestjs/common';
import { translationsCache } from '../translations.module';
import { LanguageProvider } from '@/core/interfaces/LanguageProvider';

@Injectable()
export class LanguageService {
  constructor(private readonly provider: LanguageProvider) {}

  async listLanguages(system: string, environment: string): Promise<string[]> {
    return this.provider.listLanguages(system, environment);
  }

  async createLanguage(system: string, language: string): Promise<void> {
    this.validateLanguage(language);
    await this.provider.createLanguage(system, language);
    translationsCache.deleteByPrefix(`${system}:dev:${language}:`);
  }

  async deleteLanguage(system: string, language: string): Promise<void> {
    this.validateLanguage(language);
    await this.provider.deleteLanguage(system, language);
    translationsCache.deleteByPrefix(`${system}:dev:${language}:`);
  }

  async getBaseLanguage(system: string, environment: string): Promise<string | null> {
    return this.provider.getBaseLanguage(system, environment);
  }

  async demoteBaseLanguage(system: string, language: string): Promise<void> {
    this.validateLanguage(language);
    return this.provider.demoteBaseLanguage(system, language);
  }

  async promoteToBaseLanguage(system: string, language: string): Promise<void> {
    this.validateLanguage(language);
    return this.provider.promoteToBaseLanguage(system, language);
  }

  private validateLanguage(language: string) {
    if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(language)) {
      throw new BadRequestException('Invalid language format');
    }

    try {
      return Intl.getCanonicalLocales(language)[0];
    } catch {
      throw new BadRequestException('Language not supported by Intl');
    }
  }
}
