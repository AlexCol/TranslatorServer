import { Provider } from '@nestjs/common';
import { DatabaseEnvironmentProvider } from './DatabaseEnvironmentProvider';
import { DatabaseLanguageProvider } from './DatabaseLanguageProvider';
import { DatabaseNamespaceProvider } from './DatabaseNamespaceProvider';
import { DatabasePublisherProvider } from './DatabasePublisherProvider';
import { DatabaseSystemProvider } from './DatabaseSystemProvider';
import { DatabaseTranslationProvider } from './DatabaseTranslationProvider';
import { EnvironmentProvider } from '@/core/interfaces/EnvironmentProvider';
import { LanguageProvider } from '@/core/interfaces/LanguageProvider';
import { NamespaceProvider } from '@/core/interfaces/NamespaceProvider';
import { PublisherProvider } from '@/core/interfaces/PublisherProvider';
import { SystemProvider } from '@/core/interfaces/SystemProvider';
import { TranslationProvider } from '@/core/interfaces/TranslationProvider';

export const databaseProviders: Provider[] = [
  {
    provide: TranslationProvider,
    useClass: DatabaseTranslationProvider,
  },
  {
    provide: LanguageProvider,
    useClass: DatabaseLanguageProvider,
  },
  {
    provide: EnvironmentProvider,
    useClass: DatabaseEnvironmentProvider,
  },
  {
    provide: NamespaceProvider,
    useClass: DatabaseNamespaceProvider,
  },
  {
    provide: PublisherProvider,
    useClass: DatabasePublisherProvider,
  },
  {
    provide: SystemProvider,
    useClass: DatabaseSystemProvider,
  },
];
