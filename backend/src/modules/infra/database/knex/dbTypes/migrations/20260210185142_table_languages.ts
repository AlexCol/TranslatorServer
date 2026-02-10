import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('languages', (table) => {
    table.string('code').primary(); // 'pt-BR', 'en-US'
    table.boolean('is_base').notNullable().defaultTo(false); // Marca linguagem base
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['code']);
    table.index(['is_base']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('languages');
}
