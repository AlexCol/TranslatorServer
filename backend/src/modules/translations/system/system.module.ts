import { Module } from '@nestjs/common';
import knex from 'knex';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { SystemProvider } from '@/core/interfaces/SystemProvider';
import { DatabaseSystemProvider } from '@/core/providers/Database/DatabaseSystemProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: SystemProvider,
    useFactory: () => {
      const provider = new DatabaseSystemProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [SystemController],
  providers: [SystemService, ...databaseProviders],
  exports: [SystemService],
})
export class SystemModule {}
