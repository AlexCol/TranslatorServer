import { Module } from '@nestjs/common';
import { CoreTranslationsModule } from '../core-translations/core-translations.module';
import { CdnPublisherController } from './cdn-publisher.controller';
import { CdnPublisherService } from './cdn-publisher.service';

@Module({
  imports: [CoreTranslationsModule],
  controllers: [CdnPublisherController],
  providers: [CdnPublisherService],
})
export class CdnPublisherModule {}
