import { Injectable } from '@nestjs/common';
import { Engine } from 'src/core/engine/Engine';
import { Environment } from 'src/core/types/_Simples';

@Injectable()
export class CatalogService {
  constructor(private readonly engine: Engine) {}

  async listEnvironments(): Promise<Environment[]> {
    return this.engine.listEnvironments();
  }

  async createEnvironment(env: Environment): Promise<void> {
    return this.engine.createEnvironment(env);
  }

  async deleteEnvironment(env: Environment): Promise<void> {
    return this.engine.deleteEnvironment(env);
  }
}
