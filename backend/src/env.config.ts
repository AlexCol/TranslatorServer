import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

const envConfig = {
  bunny: {
    key: process.env.BUNNY_KEY || '',
    storageName: process.env.BUNNY_STORAGE_NAME || '',
    translationsPath: process.env.BUNNY_TRANSLATIONS_PATH || '',
  },
};
export default envConfig;
