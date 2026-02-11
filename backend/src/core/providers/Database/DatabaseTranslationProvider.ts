import { BadRequestException, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { Translation } from './entities/translation.entity';
import { ensureConnected, getSystemId } from './utils';
import { getEnvironmentId } from './utils/getEnvironmentId';
import { getLanguages } from './utils/getLanguages';
import { getNamespaceId } from './utils/getNamespaceId';
import { TranslationProvider } from '@/core/interfaces/TranslationProvider';
import { CatalogEntry, LoadResult, TranslationStatus, ProviderInfo, SystemStatus } from '@/core/types';

export class DatabaseTranslationProvider implements TranslationProvider {
  private readonly logger = new Logger(DatabaseTranslationProvider.name);
  private readonly knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    void ensureConnected(this.knex);
  }

  //!carrega o json da tradução
  async loadWithFallBack(entry: CatalogEntry): Promise<LoadResult> {
    try {
      const sysId = await getSystemId(this.knex, entry.sistema);
      const envId = await getEnvironmentId(this.knex, sysId, entry.environment);
      const langs = await getLanguages(this.knex, envId);

      const baseLang = langs.filter((l) => l.isBase === 1)[0];
      const baseJson = await this.getTranslation({ ...entry, language: baseLang.code });
      const baseJsonObj = JSON.parse(baseJson.json || '{}');

      if (entry.language === baseLang.code) {
        return baseJsonObj;
      }

      //!se for 'linguagem derivada', mescla ela com a base. ex, es-AR com es, senão só devolve a linguagem específica
      const language = entry.language;
      const mergedJsonObj = { ...baseJsonObj };
      if (language.length !== 2 && language.includes('-')) {
        const baseLanguageTranslation = await this.getTranslation({ ...entry, language: language.split('-')[0] });
        const languageTranslation = await this.getTranslation(entry);

        const baseLanguageJsonObj = JSON.parse(baseLanguageTranslation.json || '{}');
        const languageJsonObj = JSON.parse(languageTranslation.json || '{}');

        Object.assign(mergedJsonObj, baseLanguageJsonObj, languageJsonObj);
      } else {
        const languageTranslation = await this.getTranslation(entry);
        const languageJsonObj = JSON.parse(languageTranslation.json || '{}');
        Object.assign(mergedJsonObj, languageJsonObj);
      }
      return mergedJsonObj;
    } catch (error) {
      this.logger.error(`Error loading translation: ${error.message}`);
      throw new BadRequestException(`Failed to load translation: ${error.message}`);
    }
  }

  async loadWithoutFallBack(entry: CatalogEntry): Promise<LoadResult> {
    try {
      //? dados para busca
      const sysId = await getSystemId(this.knex, entry.sistema);
      const envId = await getEnvironmentId(this.knex, sysId, entry.environment);
      const langs = await getLanguages(this.knex, envId);

      const baseLang = langs.filter((l) => l.isBase === 1)[0];
      const baseJson = await this.getTranslation({ ...entry, language: baseLang.code });
      const baseJsonObj = JSON.parse(baseJson.json || '{}');

      //? se é base language, não pq limpar
      if (entry.language === baseLang.code) {
        return baseJsonObj;
      }

      Object.keys(baseJsonObj).forEach((key) => {
        baseJsonObj[key] = null; //limpando os valores para manter as chaves
      });

      const langJson = await this.getTranslation(entry);
      const langJsonObj = JSON.parse(langJson.json || '{}');

      //? mesclando com a base, mas mantendo as chaves sem tradução como null
      const mergedJsonObj = { ...baseJsonObj, ...langJsonObj };
      return mergedJsonObj;
    } catch (error) {
      this.logger.error(`Error loading translation without fallback: ${error.message}`);
      throw new BadRequestException(`Failed to load translation without fallback: ${error.message}`);
    }
  }

  //!sobre chaves
  async createKey(entry: CatalogEntry, key: string, value: string): Promise<void> {
    try {
      const baseTranslation = await this.getTranslation(entry);
      const baseJson = JSON.parse(baseTranslation?.json || '{}');

      if (baseJson[key]) {
        throw new BadRequestException(`Key "${key}" already exists.`);
      }

      baseJson[key] = value;

      if (baseTranslation.id > 0) {
        await this.knex('translations')
          .where({ id: baseTranslation.id })
          .update({ json: JSON.stringify(baseJson) });
      } else {
        await this.knex('translations').insert({
          namespaceId: baseTranslation?.namespaceId,
          json: JSON.stringify(baseJson),
        });
      }

      this.logger.log(`Key "${key}" created in "${entry.sistema}/${entry.environment}/${entry.language}".`);
    } catch (error) {
      this.logger.error(`Error creating key: ${error.message}`);
      throw new BadRequestException(`Failed to create key: ${error.message}`);
    }
  }

  async createTranslation(entry: CatalogEntry, key: string, value: string): Promise<void> {
    try {
      const baseJson = await this.getTranslation({ ...entry, language: '' });
      const baseJsonObj = JSON.parse(baseJson.json || '{}');

      if (!baseJsonObj[key]) {
        throw new BadRequestException(`Key "${key}" does not exist in base language.`);
      }

      const langJson = await this.getTranslation(entry);
      const langJsonObj = JSON.parse(langJson.json || '{}');
      langJsonObj[key] = value;

      if (langJson.id > 0) {
        await this.knex('translations')
          .where({ id: langJson.id })
          .update({ json: JSON.stringify(langJsonObj) });
      } else {
        await this.knex('translations').insert({
          namespaceId: langJson?.namespaceId,
          json: JSON.stringify(langJsonObj),
        });
      }

      const msg = `Translation for key "${key}" created in "${entry.sistema}/${entry.environment}/${entry.language}".`;
      this.logger.log(msg);
    } catch (error) {
      this.logger.error(`Error creating translation: ${error.message}`);
      throw new BadRequestException(`Failed to create translation: ${error.message}`);
    }
  }

  async updateKey(entry: CatalogEntry, key: string, value: string): Promise<void> {
    try {
      const json = await this.getTranslation(entry);
      const jsonObj = JSON.parse(json.json || '{}');

      if (!jsonObj[key]) {
        throw new BadRequestException(`Key "${key}" does not exist.`);
      }

      jsonObj[key] = value;

      await this.knex('translations')
        .where({ id: json.id })
        .update({ json: JSON.stringify(jsonObj) });

      this.logger.log(`Key "${key}" updated in "${entry.sistema}/${entry.environment}/${entry.language}".`);
    } catch (error) {
      this.logger.error(`Error updating key: ${error.message}`);
      throw new BadRequestException(`Failed to update key: ${error.message}`);
    }
  }

  async deleteKey(entry: CatalogEntry, key: string): Promise<void> {
    try {
      const sysId = await getSystemId(this.knex, entry.sistema);
      const envId = await getEnvironmentId(this.knex, sysId, entry.environment);
      const langs = await getLanguages(this.knex, envId);

      for (const lang of langs) {
        const translation = await this.getTranslation({ ...entry, language: lang.code });
        const jsonObj = JSON.parse(translation.json || '{}');
        if (jsonObj[key]) {
          delete jsonObj[key];
          await this.knex('translations')
            .where({ id: translation.id })
            .update({ json: JSON.stringify(jsonObj) });
          this.logger.log(`Key "${key}" deleted from "${entry.sistema}/${entry.environment}/${lang.code}".`);
        }
      }

      this.logger.log(`Key "${key}" deleted from all languages in "${entry.sistema}/${entry.environment}".`);
    } catch (error) {
      this.logger.error(`Error deleting key: ${error.message}`);
      throw new BadRequestException(`Failed to delete key: ${error.message}`);
    }
  }

  //!status e informações gerais
  async getTranslationStatus(entry: CatalogEntry): Promise<TranslationStatus> {
    throw new Error('Method not implemented.');
  }

  async getProviderInfo(): Promise<ProviderInfo> {
    throw new Error('Method not implemented.');
  }
  async getStats(env: string, sistema: string): Promise<SystemStatus> {
    throw new Error('Method not implemented.');
  }

  /******************************************************/
  /* Metodos privados                                   */
  /******************************************************/
  private async getTranslation(entry: CatalogEntry): Promise<Translation> {
    const sysId = await getSystemId(this.knex, entry.sistema);
    const envId = await getEnvironmentId(this.knex, sysId, entry.environment);

    const langs = await getLanguages(this.knex, envId);
    const lang = entry.language
      ? langs.filter((l) => l.code === entry.language)[0]
      : langs.filter((l) => l.isBase === 1)[0];

    if (!lang) {
      throw new BadRequestException(
        `Language "${entry.language}" not found for system "${entry.sistema}" and environment "${entry.environment}".`,
      );
    }

    const namespaceId = await getNamespaceId(this.knex, lang.id, entry.namespace);
    const row = await this.knex.select('*').from<Translation>('translations').where({ namespaceId }).first();

    if (!row) {
      const emptyTranslation: Translation = {
        id: 0,
        namespaceId,
        json: '{}',
      };
      return emptyTranslation;
    }

    return row;
  }
}
