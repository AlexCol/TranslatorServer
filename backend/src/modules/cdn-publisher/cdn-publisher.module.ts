import { Module } from '@nestjs/common';
import { CoreTranslationsModule } from '../core-translations/core-translations.module';
import { CdnPublisherController } from './cdn-publisher.controller';
import { CdnPublisherService } from './cdn-publisher.service';
import { CdnPublisher } from './interfaces/CdnPublisher';
import { BunnyStorage } from './providers/bunny/bunny-storage';
import envConfig from '@/env.config';

@Module({
  imports: [CoreTranslationsModule],
  controllers: [CdnPublisherController],
  providers: [
    CdnPublisherService,
    {
      provide: CdnPublisher,
      useFactory: () => {
        const provider = new BunnyStorage(
          envConfig.bunny.key,
          envConfig.bunny.storageName,
          envConfig.bunny.translationsPath,
        );
        return provider;
      },
    },
  ],
})
export class CdnPublisherModule {}
