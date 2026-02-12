import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const envConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',

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
