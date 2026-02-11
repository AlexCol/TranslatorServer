import { Logger } from '@nestjs/common';
import { Knex } from 'knex';

export async function ensureConnected(knex: Knex): Promise<void> {
  const logger = new Logger('ensureConnected');

  try {
    await knex.raw('SELECT 1');
    logger.debug('Database connection established');
  } catch (error) {
    logger.warn(`Database not yet connected: ${error}`);
  }
}
