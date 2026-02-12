import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { LanguageModule } from './language/language.module';
import { NamespaceModule } from './namespace/namespace.module';
import { PublisherModule } from './publisher/publisher.module';
import { SystemModule } from './system/system.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [SystemModule, EnvironmentModule, LanguageModule, NamespaceModule, TranslationsModule, PublisherModule],
  controllers: [],
  providers: [],
})
export class CoreTranslationsModule {}
