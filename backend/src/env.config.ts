import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const nodeEnv = process.env.NODE_ENV || 'development';

const envConfig = {
  nodeEnv,

  session: {
    ttl: parseInt(process.env.SESSION_TTL || '604800', 10), // time to live in seconds (default: 7 days)
    cookieSecret: process.env.COOKIE_SECRET || '',
  },

  redmine: {
    url: process.env.REDMINE_URL || '',
  },

  auth: {
    provider: process.env.AUTH_PROVIDER || 'mock',
  },

  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS || '',
  },

  translations: {
    ttl: parseInt(process.env.TRANSLATIONS_CACHE_TTL || process.env.SESSION_TTL || '604800', 10),
  },

  bunny: {
    key: process.env.BUNNY_KEY || '',
    storageName: process.env.BUNNY_STORAGE_NAME || '',
    translationsPath: process.env.BUNNY_TRANSLATIONS_PATH || '',
  },
};
export default envConfig;
