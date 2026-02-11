import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LanguageService } from './language.service';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get(':system/:environment')
  async getSystemInfo(@Param('system') system: string, @Param('environment') environment: string) {
    return await this.languageService.listLanguages(system, environment);
  }

  @Get(':system/:environment/base')
  async getBaseLanguage(@Param('system') system: string, @Param('environment') environment: string) {
    return await this.languageService.getBaseLanguage(system, environment);
  }

  @Post(':system/:language')
  async createLanguage(@Param('system') system: string, @Param('language') language: string) {
    return await this.languageService.createLanguage(system, language);
  }

  @Post(':system/:language/promote')
  async promoteToBaseLanguage(@Param('system') system: string, @Param('language') language: string) {
    return await this.languageService.promoteToBaseLanguage(system, language);
  }

  @Post(':system/:language/demote')
  async demoteBaseLanguage(@Param('system') system: string, @Param('language') language: string) {
    return await this.languageService.demoteBaseLanguage(system, language);
  }

  @Delete(':system/:language')
  async deleteLanguage(@Param('system') system: string, @Param('language') language: string) {
    return await this.languageService.deleteLanguage(system, language);
  }
}
