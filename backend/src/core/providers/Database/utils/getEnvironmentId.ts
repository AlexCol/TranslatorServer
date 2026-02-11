import { Knex } from 'knex';

export async function getEnvironmentId(knex: Knex, system_id: number, environment: string): Promise<number> {
  const row = await knex('environments').where({ system_id, name: environment }).first('id');
  if (!row) {
    throw new Error(`Environment '${environment}' does not exist for system ID '${system_id}'`);
  }
  return row.id;
}
