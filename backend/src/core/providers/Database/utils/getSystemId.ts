import { Knex } from 'knex';

export async function getSystemId(knex: Knex, system: string): Promise<number> {
  const row = await knex('systems').where({ name: system }).first('id');
  if (!row) {
    throw new Error(`System '${system}' does not exist`);
  }
  return row.id;
}
