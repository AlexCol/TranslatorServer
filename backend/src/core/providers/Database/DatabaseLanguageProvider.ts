import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { ensureConnected, getSystemId } from './utils';
import { getEnvironmentId } from './utils/getEnvironmentId';
import { LanguageProvider } from '@/core/interfaces/LanguageProvider';

export class DatabaseLanguageProvider implements LanguageProvider {
  private readonly logger = new Logger(DatabaseLanguageProvider.name);
  private readonly knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    void ensureConnected(this.knex);
  }

  async listLanguages(sistema: string, env: string): Promise<string[]> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, env);
      const rows = await this.knex('languages').where({ environment_id: envId }).select('code');
      return rows.map((row) => row.code);
    } catch (error) {
      this.logger.error(`Error listing languages for system ${sistema} and env ${env}:`, error);
      throw new BadRequestException(`Error listing languages for system ${sistema} and env ${env}: ${error.message}`);
    }
  }

  async createLanguage(sistema: string, language: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');
      const exists = await this.knex('languages').where({ environment_id: envId, code: language }).first();

      if (exists) {
        throw new Error(`Language '${language}' already exists for system '${sistema}' in 'dev' environment`);
      }

      await this.knex('languages').insert({
        environment_id: envId,
        code: language,
        is_base: false,
      });

      this.logger.debug(`Language '${language}' created successfully for system '${sistema}' in 'dev' environment`);
    } catch (error) {
      this.logger.error(`Error creating language '${language}' for system '${sistema}':`, error);
      throw error;
    }
  }

  async deleteLanguage(sistema: string, language: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');
      const exists = await this.knex('languages').where({ environment_id: envId, code: language }).first();
      if (!exists) {
        throw new BadRequestException(
          `Language '${language}' does not exist for system '${sistema}' in 'dev' environment`,
        );
      }

      const isBase = exists.isBase === 1;
      if (isBase) {
        throw new BadRequestException(
          `Cannot delete base language '${language}' for system '${sistema}' in 'dev' environment. Please promote another language to base before deleting.`,
        );
      }

      await this.knex('languages').where({ environment_id: envId, code: language }).del();
      this.logger.debug(`Language '${language}' deleted successfully for system '${sistema}' in 'dev' environment`);
    } catch (error) {
      this.logger.error(`Error deleting language '${language}' for system '${sistema}':`, error);
      throw new BadRequestException(`Error deleting language '${language}' for system '${sistema}': ${error.message}`);
    }
  }

  async getBaseLanguage(sistema: string, env: string): Promise<string | null> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, env);
      const row = await this.knex('languages').where({ environment_id: envId, is_base: true }).first();
      return row ? row.code : null;
    } catch (error) {
      this.logger.error(`Error getting base language for system '${sistema}' and env '${env}':`, error);
      throw new BadRequestException(
        `Error getting base language for system '${sistema}' and env '${env}': ${error.message}`,
      );
    }
  }

  async demoteBaseLanguage(sistema: string, language: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');

      //! verifica se o idioma existe e é base
      const row = await this.knex('languages').where({ environment_id: envId, code: language, is_base: true }).first();
      if (!row) {
        throw new BadRequestException(
          `Language '${language}' is not the base language for system '${sistema}' in 'dev' environment or does not exist`,
        );
      }

      await this.knex('languages').where({ environment_id: envId, code: language }).update({ is_base: false });

      this.logger.debug(`Language '${language}' demoted from base successfully for system '${sistema}'`);
    } catch (error) {
      this.logger.error(`Error demoting base language '${language}' for system '${sistema}':`, error);
      throw new BadRequestException(
        `Error demoting base language '${language}' for system '${sistema}': ${error.message}`,
      );
    }
  }

  async promoteToBaseLanguage(sistema: string, language: string): Promise<void> {
    try {
      const systemId = await getSystemId(this.knex, sistema);
      const envId = await getEnvironmentId(this.knex, systemId, 'dev');

      //! verifica se o idioma existe
      const row = await this.knex('languages').where({ environment_id: envId, code: language }).first();
      if (!row) {
        throw new BadRequestException(
          `Language '${language}' does not exist for system '${sistema}' in 'dev' environment`,
        );
      }

      //! despromove o idioma base atual, se existir
      await this.knex('languages').where({ environment_id: envId, is_base: true }).update({ is_base: false });

      //! promove o novo idioma base
      await this.knex('languages').where({ environment_id: envId, code: language }).update({ is_base: true });

      this.logger.debug(`Language '${language}' promoted to base successfully for system '${sistema}'`);
    } catch (error) {
      this.logger.error(`Error promoting language '${language}' to base for system '${sistema}':`, error);
      throw new BadRequestException(
        `Error promoting language '${language}' to base for system '${sistema}': ${error.message}`,
      );
    }
  }
}
