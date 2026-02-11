import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NamespaceService } from './namespace.service';

@Controller('namespaces')
export class NamespaceController {
  constructor(private readonly namespaceService: NamespaceService) {}

  @Get(':system/:environment/:language')
  async listNamespaces(
    @Param('system') system: string,
    @Param('environment') environment: string,
    @Param('language') language: string,
  ) {
    return this.namespaceService.listNamespaces(system, environment, language);
  }

  @Post(':system/:namespace')
  async createNamespace(@Param('system') system: string, @Param('namespace') namespace: string) {
    await this.namespaceService.createNamespace(system, namespace);
  }

  @Delete(':system/:namespace')
  async deleteNamespace(@Param('system') system: string, @Param('namespace') namespace: string) {
    await this.namespaceService.deleteNamespace(system, namespace);
  }
}
