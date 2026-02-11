import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LanguageDto } from './dto/language.dto';
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

  @Post()
  async createLanguage(@Body() body: LanguageDto) {
    const { system, code } = body;
    return await this.languageService.createLanguage(system, code);
  }

  @Post('promote')
  async promoteToBaseLanguage(@Body() body: LanguageDto) {
    const { system, code } = body;
    return await this.languageService.promoteToBaseLanguage(system, code);
  }

  @Post('demote')
  async demoteBaseLanguage(@Body() body: LanguageDto) {
    const { system, code } = body;
    return await this.languageService.demoteBaseLanguage(system, code);
  }

  @Delete()
  async deleteLanguage(@Body() body: LanguageDto) {
    const { system, code } = body;
    return await this.languageService.deleteLanguage(system, code);
  }
}
