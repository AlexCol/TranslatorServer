import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('translations', (table) => {
    table.string('system').notNullable();
    table.string('environment').notNullable();
    table.string('language').notNullable();
    table.string('namespace').notNullable();
    table.string('key').notNullable(); // 'welcome_message', 'error.email'
    table.text('value').notNullable(); // 'Bem-vindo!', 'Email inválido'
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Foreign Keys
    table.foreign('system').references('systems.name').onDelete('CASCADE');
    table.foreign('environment').references('environments.name').onDelete('CASCADE');
    table.foreign('language').references('languages.code').onDelete('CASCADE');
    table.foreign('namespace').references('namespaces.name').onDelete('CASCADE');

    // Unique: uma chave por combinação sistema+ambiente+idioma+namespace
    table.unique(['system', 'environment', 'language', 'namespace', 'key'], {
      indexName: 'idx_unique_translation',
    });

    // Índices para performance
    table.index(['system', 'environment', 'language', 'namespace'], 'idx_main_lookup');
    table.index(['system', 'environment'], 'idx_system_env');
    table.index(['language', 'namespace'], 'idx_lang_namespace');
    table.index(['key'], 'idx_key');
    table.index(['environment'], 'idx_environment');
    table.index(['language'], 'idx_language');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('translations');
}
