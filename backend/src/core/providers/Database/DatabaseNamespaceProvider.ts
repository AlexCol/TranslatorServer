import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { ensureConnected, getSystemId } from './utils';
import { getEnvironmentId } from './utils/getEnvironmentId';
import { getLanguage } from './utils/getLanguage';
import { getLanguages } from './utils/getLanguages';
import { NamespaceProvider } from '@/core/interfaces/NamespaceProvider';
import { CatalogEntry, ValidationResult } from '@/core/types';

export class DatabaseNamespaceProvider implements NamespaceProvider {
  private readonly logger = new Logger(DatabaseNamespaceProvider.name);
  private readonly knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    void ensureConnected(this.knex);
  }

  async listNamespaces(sistema: string, env: string, language: string): Promise<string[]> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, env);
      const lang = await getLanguage(this.knex, envId, language);
      if (!lang) {
        throw new Error(`Language '${language}' does not exist for system ${sistema} and environment ${env}`);
      }

      const rows = await this.knex('namespaces').where({ language_id: lang.id }).select('name');
      return rows.map((row) => row.name);
    } catch (error) {
      this.logger.error(`Error listing namespaces for system ${sistema}, env ${env}, and language ${language}:`, error);
      throw new BadRequestException(
        `Error listing namespaces for system ${sistema}, env ${env}, and language ${language}: ${error.message}`,
      );
    }
  }

  async createNamespace(sistema: string, namespace: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');
      const langs = await getLanguages(this.knex, envId);

      const baseLang = langs.find((lang) => lang.isBase === 1);
      if (!baseLang) {
        throw new Error(`No base language found for system ${sistema} in 'dev' environment`);
      }

      const existing = await this.knex('namespaces').where({ language_id: baseLang.id, name: namespace }).first('id');
      if (existing) {
        throw new BadRequestException(`Namespace '${namespace}' already exists for system ${sistema}.`);
      }

      await this.knex.transaction(async (trx) => {
        for (const lang of langs) {
          await trx('namespaces').insert({ language_id: lang.id, name: namespace });
        }
      });

      this.logger.log(`Namespace '${namespace}' created for system ${sistema}.`);
    } catch (error) {
      this.logger.error(`Error creating namespace '${namespace}' for system ${sistema}: ${error.message}`);
      throw new BadRequestException(`Error creating namespace '${namespace}' for system ${sistema}: ${error.message}`);
    }
  }

  async deleteNamespace(sistema: string, namespace: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');
      const langs = await getLanguages(this.knex, envId);

      const baseLang = langs.find((lang) => lang.isBase === 1);
      if (!baseLang) {
        throw new Error(`No base language found for system ${sistema} in 'dev' environment`);
      }

      const existing = await this.knex('namespaces').where({ language_id: baseLang.id, name: namespace }).first('id');
      if (!existing) {
        throw new BadRequestException(`Namespace '${namespace}' does not exist for system ${sistema}.`);
      }

      await this.knex.transaction(async (trx) => {
        for (const lang of langs) {
          await trx('namespaces').where({ language_id: lang.id, name: namespace }).del();
        }
      });

      this.logger.log(`Namespace '${namespace}' deleted for system ${sistema}.`);
    } catch (error) {
      this.logger.error(`Error deleting namespace '${namespace}' for system ${sistema}: ${error.message}`);
      throw new BadRequestException(`Error deleting namespace '${namespace}' for system ${sistema}: ${error.message}`);
    }
  }

  validateNamespace(entry: CatalogEntry): Promise<ValidationResult> {
    throw new Error('Method not implemented.');
  }
}
