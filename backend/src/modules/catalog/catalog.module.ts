import { Module } from '@nestjs/common';
import knex from 'knex';
import { getKnexConfig } from '../infra/database/knex/dbTypes/knexConfig';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Engine } from '@/core/engine/Engine';
import { DatabaseProvider } from '@/core/providers/DatatabaseProvider';

@Module({
  controllers: [CatalogController],
  providers: [
    CatalogService,
    {
      provide: Engine,
      useFactory: () => {
        const provider = new DatabaseProvider(knex(getKnexConfig()));
        //const provider = new FileSystemProvider(process.cwd() + '/translations');
        //const provider = new BunnyStorageProvider('', 'sys-tradutor', 'translations');
        return new Engine(provider);
      },
    },
  ],
})
export class CatalogModule {}
