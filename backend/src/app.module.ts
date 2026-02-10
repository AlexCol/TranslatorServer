import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { GlobalErrorFilter } from './filters/GlobalError.filter';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InfraModule } from './modules/infra/infra.module';

@Module({
  imports: [InfraModule, CatalogModule],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: GlobalErrorFilter }],
})
export class AppModule {}
