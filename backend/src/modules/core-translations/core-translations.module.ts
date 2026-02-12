import { Module } from '@nestjs/common';
import { EnvironmentController } from './environment/environment.controller';
import { EnvironmentService } from './environment/environment.service';
import { LanguageController } from './language/language.controller';
import { LanguageService } from './language/language.service';
import { NamespaceController } from './namespace/namespace.controller';
import { NamespaceService } from './namespace/namespace.service';
import { PublisherController } from './publisher/publisher.controller';
import { PublisherService } from './publisher/publisher.service';
import { SystemController } from './system/system.controller';
import { SystemService } from './system/system.service';
import { TranslationsController } from './translations/translations.controller';
import { TranslationsService } from './translations/translations.service';
import { databaseProviders } from '@/core/providers/Database';

const controllers = [
  SystemController,
  EnvironmentController,
  LanguageController,
  NamespaceController,
  TranslationsController,
  PublisherController,
];

const services = [
  SystemService,
  EnvironmentService,
  LanguageService,
  NamespaceService,
  TranslationsService,
  PublisherService,
];

const jsonProviders = [...databaseProviders];

@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...services, ...jsonProviders],
})
export class CoreTranslationsModule {}
