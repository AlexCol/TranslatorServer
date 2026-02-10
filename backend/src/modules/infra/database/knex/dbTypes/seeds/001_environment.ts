import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const dev = await knex('environments').where({ name: 'dev' }).first();
  if (!dev) {
    await knex('environments').insert({ name: 'dev' });
  }

  const prod = await knex('environments').where({ name: 'prod' }).first();
  if (!prod) {
    await knex('environments').insert({ name: 'prod' });
  }
}
