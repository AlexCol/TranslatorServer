import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { GlobalErrorFilter } from './filters/GlobalError.filter';
import { InfraModule } from './modules/infra/infra.module';
import { TranslationsModule } from './modules/translations/translations.module';

@Module({
  imports: [InfraModule, TranslationsModule],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: GlobalErrorFilter }],
})
export class AppModule {}
