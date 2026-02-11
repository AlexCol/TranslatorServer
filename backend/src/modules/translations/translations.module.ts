import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { LanguageModule } from './language/language.module';
import { SystemModule } from './system/system.module';
import { InMemoryCache } from '@/core/cache/InMemoryCache';

export const translationsCache = new InMemoryCache();

@Module({
  imports: [SystemModule, EnvironmentModule, LanguageModule],
  controllers: [],
  providers: [],
})
export class TranslationsModule {}
