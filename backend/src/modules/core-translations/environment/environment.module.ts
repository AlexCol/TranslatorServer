import { Module } from '@nestjs/common';
import knex from 'knex';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';
import { EnvironmentProvider } from '@/core/interfaces/EnvironmentProvider';
import { DatabaseEnvironmentProvider } from '@/core/providers/Database/DatabaseEnvironmentProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: EnvironmentProvider,
    useFactory: () => {
      const provider = new DatabaseEnvironmentProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [EnvironmentController],
  providers: [EnvironmentService, ...databaseProviders],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
