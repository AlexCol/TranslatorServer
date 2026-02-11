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
    return await this.systemService.loadWithFallBack({ system: system, environment, language, namespace });
  }

  @Get(':system/:environment/:language/:namespace/clean')
  async loadWithoutFallBack(
    @Param('system') system: string,
    @Param('environment') environment: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
  ) {
    return await this.systemService.loadWithoutFallBack({ system: system, environment, language, namespace });
  }

  @Get(':system/:environment/:language/:namespace/status')
  async getTranslationStatus(
    @Param('system') system: string,
    @Param('environment') environment: string,
    @Param('language') language: string,
    @Param('namespace') namespace: string,
  ) {
    return await this.systemService.getTranslationStatus({ system: system, environment, language, namespace });
  }

  @Post('key')
  async createNewKey(@Body() body: CreateKeyDto) {
    return await this.systemService.createKey(body.system, body.namespace, body.key, body.key);
  }

  @Post('translation')
  async createTranslation(@Body() body: CreateTranslationDto) {
    return await this.systemService.createTranslation(body.system, body.language, body.namespace, body.key, body.value);
  }

  @Patch('translation')
  async updateTranslation(@Body() body: CreateTranslationDto) {
    return await this.systemService.updateKey(body.system, body.language, body.namespace, body.key, body.value);
  }

  @Delete('key')
  async deleteKey(@Body() body: CreateKeyDto) {
    return await this.systemService.deleteKey(body.system, body.namespace, body.key);
  }
}
