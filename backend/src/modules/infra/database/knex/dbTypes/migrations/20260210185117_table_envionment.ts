import type { Knex } from 'knex';
import { seed } from '../seeds/001_environment';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('environments', (table) => {
    table.string('name').primary(); // 'dev', 'prod', 'staging'
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['name']);
  });

  await seed(knex);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('environments');
}
