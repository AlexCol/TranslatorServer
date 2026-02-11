import { Logger } from '@nestjs/common';
import { Knex } from 'knex';

export async function waitForConnection(knex: Knex, maxAttempts = 5, delayMs = 1000): Promise<void> {
  const logger = new Logger('waitForConnection');

  for (let i = 0; i < maxAttempts; i++) {
    try {
      await knex.raw('SELECT 1');
      return;
    } catch (error) {
      if (i < maxAttempts - 1) {
        logger.debug(`Waiting for database connection (attempt ${i + 1}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw error;
      }
    }
  }
}
