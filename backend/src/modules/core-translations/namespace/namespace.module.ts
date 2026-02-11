import { Module } from '@nestjs/common';
import knex from 'knex';
import { NamespaceController } from './namespace.controller';
import { NamespaceService } from './namespace.service';
import { NamespaceProvider } from '@/core/interfaces/NamespaceProvider';
import { DatabaseNamespaceProvider } from '@/core/providers/Database/DatabaseNamespaceProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: NamespaceProvider,
    useFactory: () => {
      const provider = new DatabaseNamespaceProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [NamespaceController],
  providers: [NamespaceService, ...databaseProviders],
  exports: [NamespaceService],
})
export class NamespaceModule {}
