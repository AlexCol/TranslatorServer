import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { ensureConnected, getSystemId, waitForConnection } from './utils';
import { EnvironmentProvider } from '@/core/interfaces/EnvironmentProvider';

export class DatabaseEnvironmentProvider implements EnvironmentProvider {
  private readonly logger = new Logger(DatabaseEnvironmentProvider.name);
  private readonly knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    void ensureConnected(this.knex);
  }

  async listEnvironments(system: string): Promise<string[]> {
    try {
      await waitForConnection(this.knex);
      const systemId = await getSystemId(this.knex, system);
      const rows = await this.knex('environments').where({ system_id: systemId }).select('name').orderBy('name');
      return rows.map((row) => row.name);
    } catch (error) {
      this.logger.error(`Error listing environments for system '${system}': ${error}`);
      throw new BadRequestException(`Error listing environments for system '${system}': ${error.message}`);
    }
  }

  async createEnvironment(system: string, environment: string): Promise<void> {
    try {
      await waitForConnection(this.knex);
      const systemId = await getSystemId(this.knex, system);
      const exists = await this.knex('environments').where({ system_id: systemId, name: environment }).first();
      if (exists) {
        throw new BadRequestException(`Environment '${environment}' already exists for system '${system}'`);
      }

      await this.knex('environments').insert({ system_id: systemId, name: environment });
      this.logger.debug(`Environment '${environment}' created successfully for system '${system}'`);
    } catch (error) {
      this.logger.error(`Error creating environment '${environment}' for system '${system}': ${error}`);
      throw new BadRequestException(
        `Error creating environment '${environment}' for system '${system}': ${error.message}`,
      );
    }
  }

  async deleteEnvironment(system: string, environment: string): Promise<void> {
    try {
      if (environment === 'dev' || environment === 'prod') {
        throw new BadRequestException(`Cannot delete reserved environment '${environment}' for system '${system}'`);
      }

      await waitForConnection(this.knex);
      const systemId = await getSystemId(this.knex, system);
      const exists = await this.knex('environments').where({ system_id: systemId, name: environment }).first();
      if (!exists) {
        throw new BadRequestException(`Environment '${environment}' does not exist for system '${system}'`);
      }

      await this.knex('environments').where({ system_id: systemId, name: environment }).del();
      this.logger.debug(`Environment '${environment}' deleted successfully for system '${system}'`);
    } catch (error) {
      this.logger.error(`Error deleting environment '${environment}' for system '${system}': ${error}`);
      throw new BadRequestException(
        `Error deleting environment '${environment}' for system '${system}': ${error.message}`,
      );
    }
  }
}
