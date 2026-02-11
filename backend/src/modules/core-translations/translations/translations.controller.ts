import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateKeyDto } from './dto/create-key.dto';
import { CreateTranslationDto } from './dto/create-tranlantion-key.dto';
import { TranslationsService } from './translations.service';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly systemService: TranslationsService) {}

  @Get(':system/:environment/:language/:namespace')
  async loadWithFallBack(
    @Param('system') system: string,
    @Param('environment') environment: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
  ) {
    return await this.systemService.loadWithFallBack({ sistema: system, environment, language, namespace });
  }

  @Get(':system/:environment/:language/:namespace/clean')
  async loadWithoutFallBack(
    @Param('system') system: string,
    @Param('environment') environment: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
  ) {
    return await this.systemService.loadWithoutFallBack({ sistema: system, environment, language, namespace });
  }

  @Post(':system/:namespace/key')
  async createNewKey(
    @Param('system') system: string,
    @Param('namespace') namespace: string,
    @Body() body: CreateKeyDto,
  ) {
    return await this.systemService.createKey(system, namespace, body.key, body.key);
  }

  @Post(':system/:language/:namespace/translation')
  async createTranslation(
    @Param('system') system: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
    @Body() body: CreateTranslationDto,
  ) {
    return await this.systemService.createTranslation(system, language, namespace, body.key, body.value);
  }

  @Patch(':system/:language/:namespace/translation')
  async updateTranslation(
    @Param('system') system: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
    @Body() body: CreateTranslationDto,
  ) {
    return await this.systemService.updateKey(system, language, namespace, body.key, body.value);
  }

  @Delete(':system/:namespace/key')
  async deleteKey(@Param('system') system: string, @Param('namespace') namespace: string, @Body() body: CreateKeyDto) {
    return await this.systemService.deleteKey(system, namespace, body.key);
  }
}
