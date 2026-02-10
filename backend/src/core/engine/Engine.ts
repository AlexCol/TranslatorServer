import { BadRequestException, Logger } from '@nestjs/common';
import { InMemoryCache } from '../cache/InMemoryCache';
import { Provider } from '../interfaces/Provider';
import { Environment } from '../types/_Simples';
import { AvailableLanguages } from '../types/AvailableLanguages';

export class Engine {
  private readonly logger = new Logger(Engine.name);
  private static cache = new InMemoryCache();
  private static availableLanguages: AvailableLanguages = {};
  private readonly BASE_LANGUAGE = 'pt-BR';

  constructor(private readonly provider: Provider) {}

  //#region Ambientes
  /**********************************************/
  /* Gerenciar Ambientes (dev, prod, etc)      */
  /**********************************************/
  async listEnvironments(): Promise<Environment[]> {
    this.logger.debug('Listing all environments');
    return this.provider.listEnvironments();
  }

  async createEnvironment(env: Environment): Promise<void> {
    // Validar nome do ambiente
    if (!env || !env.trim()) {
      throw new BadRequestException('Environment name cannot be empty');
    }

    // Validar se já existe
    const existing = await this.provider.listEnvironments();
    if (existing.includes(env)) {
      throw new BadRequestException(`Environment '${env}' already exists`);
    }

    this.logger.debug(`Creating environment: ${env}`);
    await this.provider.createEnvironment(env);

    // Invalidar cache
    this.clearCache();
  }

  async deleteEnvironment(env: Environment): Promise<void> {
    // Validar se existe
    const existing = await this.provider.listEnvironments();
    if (!existing.includes(env)) {
      throw new BadRequestException(`Environment '${env}' does not exist`);
    }

    // Prevenir deleção do ambiente padrão
    if (env === 'dev' || env === 'prod') {
      throw new BadRequestException(`Cannot delete default environment '${env}'`);
    }

    this.logger.debug(`Deleting environment: ${env}`);
    await this.provider.deleteEnvironment(env);

    // Invalidar cache
    this.clearCache();
  }
  //#endregion

  //#region Métodos Privados
  /**********************************************/
  /* Métodos Privados                          */
  /**********************************************/
  private clearCache(prefix?: string): void {
    if (prefix) {
      Engine.cache.deleteByPrefix(prefix);
      this.logger.verbose(`Cache cleared for prefix: ${prefix}`);
      return;
    }

    Engine.cache.clear();
    this.logger.verbose('Cache cleared completely');
  }
  //#endregion
}
