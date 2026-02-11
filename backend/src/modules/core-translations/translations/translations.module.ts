import { Module } from '@nestjs/common';
import knex from 'knex';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { TranslationProvider } from '@/core/interfaces/TranslationProvider';
import { DatabaseTranslationProvider } from '@/core/providers/Database/DatabaseTranslationProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: TranslationProvider,
    useFactory: () => {
      const provider = new DatabaseTranslationProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [TranslationsController],
  providers: [TranslationsService, ...databaseProviders],
  exports: [TranslationsService],
})
export class TranslationsModule {}
