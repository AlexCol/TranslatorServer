import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { Provider } from '../interfaces/Provider';
import {
  CatalogEntry,
  LoadResult,
  Environment,
  ValidationResult,
  KeyFilter,
  PublishInfo,
  TranslationStatus,
  ProviderInfo,
  SystemStatus,
} from '../types';

export class DatabaseProvider implements Provider {
  private readonly logger = new Logger(DatabaseProvider.name);

  constructor(private readonly knex: Knex) {
    void this.ensureConnected();
  }

  //#region Gerenciar Ambientes
  /**********************************************/
  /* Gerenciar Ambientes                       */
  /**********************************************/
  async listEnvironments(): Promise<Environment[]> {
    try {
      await this.waitForConnection();

      const rows = await this.knex('environments').select('name').orderBy('name');

      return rows.map((row) => row.name as Environment);
    } catch (error) {
      this.logger.error(`Error listing environments: ${error}`);
      return [];
    }
  }

  async createEnvironment(env: Environment): Promise<void> {
    try {
      await this.waitForConnection();

      // Verificar se já existe
      const exists = await this.knex('environments').where({ name: env }).first();
      if (exists) {
        throw new BadRequestException(`Environment '${env}' already exists`);
      }

      // Criar ambiente
      await this.knex('environments').insert({ name: env });
      this.logger.debug(`Environment '${env}' created successfully`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        throw new BadRequestException(error.message);
      }
      this.logger.error(`Error creating environment: ${error}`);
      throw new BadRequestException('Failed to create environment');
    }
  }

  async deleteEnvironment(env: Environment): Promise<void> {
    try {
      await this.waitForConnection();

      // Verificar se existe
      const envData = await this.knex('environments').where({ name: env }).first();

      if (!envData) {
        throw new BadRequestException(`Environment '${env}' does not exist`);
      }

      // Deletar o ambiente
      await this.knex('environments').where({ name: env }).delete();

      this.logger.debug(`Environment '${env}' deleted successfully`);
    } catch (error) {
      if (error instanceof Error && error.message.includes('does not exist')) {
        throw new BadRequestException(error.message);
      }
      this.logger.error(`Error deleting environment: ${error}`);
      throw new BadRequestException('Failed to delete environment');
    }
  }

  //#endregion

  //#region Not Implemented
  /**********************************************/
  /* Métodos Ainda Não Implementados           */
  /**********************************************/

  loadWithFallBack(entry: CatalogEntry): Promise<LoadResult> {
    throw new BadRequestException('Method not implemented.');
  }

  loadWithoutFallBack(entry: CatalogEntry): Promise<LoadResult> {
    throw new BadRequestException('Method not implemented.');
  }

  listSystems(env: Environment, sistema: string): Promise<string[]> {
    throw new BadRequestException('Method not implemented.');
  }

  createSystem(sistema: string, language: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  deleteSystem(sistema: string, language: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  listLanguages(env: Environment, sistema: string): Promise<string[]> {
    throw new BadRequestException('Method not implemented.');
  }

  createLanguage(sistema: string, language: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  deleteLanguage(sistema: string, language: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  listNamespaces(env: Environment, sistema: string, language: string): Promise<string[]> {
    throw new BadRequestException('Method not implemented.');
  }

  createNamespace(sistema: string, language: string, namespace: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  deleteNamespace(sistema: string, language: string, namespace: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  validateNamespace(entry: CatalogEntry): Promise<ValidationResult> {
    throw new BadRequestException('Method not implemented.');
  }

  createKey(entry: CatalogEntry, key: string, value: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  updateKey(entry: CatalogEntry, key: string, value: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  deleteKey(entry: CatalogEntry, key: string): Promise<void> {
    throw new BadRequestException('Method not implemented.');
  }

  searchKeys(entry: CatalogEntry, filter: KeyFilter): Promise<Record<string, string>> {
    throw new BadRequestException('Method not implemented.');
  }

  publishNamespace(sistema: string, namespace: string, from: Environment, to: Environment): Promise<PublishInfo> {
    throw new BadRequestException('Method not implemented.');
  }

  getTranslationStatus(entry: CatalogEntry): Promise<TranslationStatus> {
    throw new BadRequestException('Method not implemented.');
  }

  getProviderInfo(): Promise<ProviderInfo> {
    throw new BadRequestException('Method not implemented.');
  }

  getStats(env: Environment, sistema: string): Promise<SystemStatus> {
    throw new BadRequestException('Method not implemented.');
  }
  //#endregion

  //#region Métodos Privados
  /**********************************************/
  /* Métodos Privados                          */
  /**********************************************/
  private async ensureConnected(): Promise<void> {
    try {
      await this.knex.raw('SELECT 1');
      this.logger.debug('Database connection established');
    } catch (error) {
      this.logger.warn(`Database not yet connected: ${error}`);
    }
  }

  private async waitForConnection(maxAttempts = 5, delayMs = 1000): Promise<void> {
    for (let i = 0; i < maxAttempts; i++) {
      try {
        await this.knex.raw('SELECT 1');
        return;
      } catch (error) {
        if (i < maxAttempts - 1) {
          this.logger.debug(`Waiting for database connection (attempt ${i + 1}/${maxAttempts})`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        } else {
          throw error;
        }
      }
    }
  }
  //#endregion
}
