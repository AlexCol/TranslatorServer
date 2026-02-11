import { Module } from '@nestjs/common';
import knex from 'knex';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageProvider } from '@/core/interfaces/LanguageProvider';
import { DatabaseLanguageProvider } from '@/core/providers/Database/DatabaseLanguageProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: LanguageProvider,
    useFactory: () => {
      const provider = new DatabaseLanguageProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [LanguageController],
  providers: [LanguageService, ...databaseProviders],
  exports: [LanguageService],
})
export class LanguageModule {}
