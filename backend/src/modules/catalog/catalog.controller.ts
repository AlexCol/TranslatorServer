import { Controller, Get, Post, Delete, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { Environment } from 'src/core/types/_Simples';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('environments')
  async listEnvironments(): Promise<Environment[]> {
    return this.catalogService.listEnvironments();
  }

  @Post('environments/:env')
  @HttpCode(HttpStatus.CREATED)
  async createEnvironment(@Param('env') env: Environment): Promise<{ message: string }> {
    await this.catalogService.createEnvironment(env);
    return { message: `Environment '${env}' created successfully` };
  }

  @Delete('environments/:env')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEnvironment(@Param('env') env: Environment): Promise<void> {
    await this.catalogService.deleteEnvironment(env);
  }
}
