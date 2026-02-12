import { BadRequestException, Inject, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { Language } from './entities/language.entity';
import { Translation } from './entities/translation.entity';
import { getEnvironmentId, getLanguage, getNamespaceId, getSystemId, getTranslation } from './utils';
import { PublisherProvider } from '@/modules/core-translations/core/interfaces/PublisherProvider';
import { PublishProps } from '@/modules/core-translations/core/types/PublishProps';
import { KNEX_CONNECTION } from '@/modules/infra/database/knex/constants';

export class DatabasePublisherProvider implements PublisherProvider {
  private readonly logger = new Logger(DatabasePublisherProvider.name);

  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  //#region Metodos da interface
  /******************************************************/
  /* Metodos da interface                               */
  /******************************************************/
  async publishNamespace(props: PublishProps): Promise<string> {
    const { system, language, namespace, from, to } = props;

    await this.knex.transaction(async (trx) => {
      const sysId = await getSystemId(trx, system);
      //?dados 'from'
      const fromEnvId = await getEnvironmentId(trx, sysId, from);
      const fromLangId = (await getLanguage(trx, fromEnvId, language)).id;
      const fromNamespaceId = await getNamespaceId(trx, fromLangId, namespace);
      const fromTranslation = await getTranslation(trx, fromNamespaceId, namespace);

      //? dados 'to'
      const toEnvId = await getEnvironmentId(trx, sysId, to);
      const toLangId = await this.getToLanguageIdOrCreate(trx, toEnvId, language);
      const toNamespaceId = await this.getToNamespaceIdOrCreate(trx, toLangId, namespace);
      const toTranslation = await this.getToTranslationOrCreate(trx, toNamespaceId);

      //?update translatons
      await this.updateTranslation(trx, toTranslation.id, fromTranslation.json);

      //? update if is base language
      await this.updateBaseLanguage(trx, fromLangId, toLangId);
    });

    return 'Namespace published successfully!';
  }
  //#endregion

  //#region Metodos privados
  /******************************************************/
  /* Metodos privados                                   */
  /******************************************************/
  private async getToLanguageIdOrCreate(trx: Knex, toEnvId: number, language: string): Promise<number> {
    try {
      const lang = await trx
        .select('*')
        .from<Language>('languages')
        .where({ environmentId: toEnvId, code: language })
        .first();
      if (lang) {
        return lang.id;
      }

      const newLang = await trx<Language>('languages')
        .insert({ environmentId: toEnvId, code: language })
        .returning('*');
      return newLang[0].id;
    } catch (error) {
      throw new Error(
        `Failed to get or create language '${language}' in environment ID '${toEnvId}': ${error.message}`,
      );
    }
  }

  private async getToNamespaceIdOrCreate(trx: Knex, toLangId: number, namespace: string): Promise<number> {
    try {
      const ns = await trx.select('*').from('namespaces').where({ languageId: toLangId, name: namespace }).first();
      if (ns) {
        return ns.id;
      }
      const newNs = await trx('namespaces').insert({ languageId: toLangId, name: namespace }).returning('*');
      return newNs[0].id;
    } catch (error) {
      throw new Error(
        `Failed to get or create namespace '${namespace}' in language ID '${toLangId}': ${error.message}`,
      );
    }
  }

  private async getToTranslationOrCreate(trx: Knex, toNamespaceId: number): Promise<Translation> {
    try {
      const tr = await trx.select('*').from<Translation>('translations').where({ namespaceId: toNamespaceId }).first();
      if (tr) {
        return tr;
      }
      const newTr = await trx<Translation>('translations')
        .insert({ namespaceId: toNamespaceId, json: '{}' })
        .returning('*');
      return newTr[0];
    } catch (error) {
      throw new Error(`Failed to get or create translation for namespace ID '${toNamespaceId}': ${error.message}`);
    }
  }

  private async updateTranslation(trx: Knex, translationId: number, newJson: string): Promise<void> {
    return trx('translations').where({ id: translationId }).update({ json: newJson, updatedAt: trx.fn.now() });
  }

  private async updateBaseLanguage(trx: Knex, fromLangId: number, toLangId: number): Promise<void> {
    const fromLang = await trx.select('*').from<Language>('languages').where({ id: fromLangId }).first();
    const toLang = await trx.select('*').from<Language>('languages').where({ id: toLangId }).first();

    if (!fromLang || !toLang) {
      throw new BadRequestException(
        `Failed to find languages for base language update: fromLangId=${fromLangId}, toLangId=${toLangId}`,
      );
    }

    if (fromLang.isBase !== toLang.isBase) {
      await trx('languages').where({ id: toLangId }).update({ isBase: fromLang.isBase, updatedAt: trx.fn.now() });

      if (fromLang.isBase === 1) {
        await trx('languages')
          .where({ isBase: 1 }) // Filtra registros onde isBase é 1
          .andWhereNot({ code: toLang.code }) // Exclui o registro com o mesmo code de toLang
          .update({ isBase: 0, updatedAt: trx.fn.now() }); // Atualiza isBase para 0 e define updatedAt para o timestamp atual
      }
    }
  }
  //#endregion
}
