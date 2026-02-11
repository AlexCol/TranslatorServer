import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { System } from './entities/system.entity';
import { ensureConnected, waitForConnection } from './utils';
import { SystemProvider } from '@/core/interfaces/SystemProvider';

export class DatabaseSystemProvider implements SystemProvider {
  private readonly logger = new Logger(DatabaseSystemProvider.name);
  private readonly knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    void ensureConnected(this.knex);
  }

  async listSystems(): Promise<string[]> {
    try {
      await waitForConnection(this.knex);
      const rows = await this.knex.select('*').from<System>('systems').orderBy('name', 'asc');
      return rows.map((row) => row.name);
    } catch (error) {
      this.logger.error(`Error listing systems: ${error}`);
      throw new BadRequestException(`Error listing systems: ${error.message}`);
    }
  }

  async createSystem(system: string): Promise<void> {
    try {
      await waitForConnection(this.knex);
      const exists = await this.knex('systems').where({ name: system }).first();
      if (exists) {
        throw new BadRequestException(`System '${system}' already exists`);
      }

      const newSystem = await this.knex('systems').insert({ name: system });
      await this.insertBaseEnvironments(newSystem[0]);

      this.logger.debug(`System '${system}' created successfully`);
    } catch (error) {
      this.logger.error(`Error creating system: ${error}`);
      throw new BadRequestException(`Error creating system: ${error.message}`);
    }
  }

  async deleteSystem(system: string): Promise<void> {
    try {
      await waitForConnection(this.knex);
      const exists = await this.knex('systems').where({ name: system }).first();
      if (!exists) {
        throw new BadRequestException(`System '${system}' does not exist`);
      }

      await this.knex('systems').where({ name: system }).del();
      this.logger.debug(`System '${system}' deleted successfully`);
    } catch (error) {
      this.logger.error(`Error deleting system: ${error}`);
      throw new BadRequestException(`Error deleting system: ${error.message}`);
    }
  }

  private async insertBaseEnvironments(systemId: number): Promise<void> {
    try {
      const baseEnvironments = ['dev', 'prod'];
      const environmentsToInsert = baseEnvironments.map((env) => ({ system_id: systemId, name: env }));
      await this.knex('environments').insert(environmentsToInsert);
    } catch (error) {
      this.logger.error(`Error inserting base environments for system ID ${systemId}: ${error}`);
      throw new BadRequestException(`Error inserting base environments for system ID ${systemId}: ${error.message}`);
    }
  }
}
