import { Module } from '@nestjs/common';
import knex from 'knex';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { PublisherProvider } from '@/core/interfaces/PublisherProvider';
import { DatabasePublisherProvider } from '@/core/providers/Database/DatabasePublisherProvider';
import { getKnexConfig } from '@/modules/infra/database/knex/dbTypes/knexConfig';

const databaseProviders = [
  {
    provide: PublisherProvider,
    useFactory: () => {
      const provider = new DatabasePublisherProvider(knex(getKnexConfig()));
      return provider;
    },
  },
];

@Module({
  imports: [],
  controllers: [PublisherController],
  providers: [PublisherService, ...databaseProviders],
  exports: [PublisherService],
})
export class PublisherModule {}
