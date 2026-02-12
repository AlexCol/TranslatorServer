import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const envConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',

  session: {
    ttl: parseInt(process.env.SESSION_TTL || '604800', 10), // time to live in seconds (default: 7 days)
  },

  redmine: {
    url: process.env.REDMINE_URL || '',
  },

  cors: {
    allowedOrigins: process.env.ALLOWED_ORIGINS || '',
  },

  bunny: {
    key: process.env.BUNNY_KEY || '',
    storageName: process.env.BUNNY_STORAGE_NAME || '',
    translationsPath: process.env.BUNNY_TRANSLATIONS_PATH || '',
  },
};
export default envConfig;
