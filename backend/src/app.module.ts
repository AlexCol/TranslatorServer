import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { GlobalErrorFilter } from './filters/GlobalError.filter';
import { CoreTranslationsModule } from './modules/core-translations/core-translations.module';
import { InfraModule } from './modules/infra/infra.module';

@Module({
  imports: [InfraModule, CoreTranslationsModule],
  controllers: [AppController],
  providers: [{ provide: APP_FILTER, useClass: GlobalErrorFilter }],
})
export class AppModule {}
