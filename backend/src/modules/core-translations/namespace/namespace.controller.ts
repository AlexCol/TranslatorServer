import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NamespaceDto } from './dto/namespace.dto';
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

  @Post()
  async createNamespace(@Body() body: NamespaceDto) {
    const { system, namespace } = body;
    await this.namespaceService.createNamespace(system, namespace);
  }

  @Delete()
  async deleteNamespace(@Body() body: NamespaceDto) {
    const { system, namespace } = body;
    await this.namespaceService.deleteNamespace(system, namespace);
  }
}
