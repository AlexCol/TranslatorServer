import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get(':system')
  async getSystemInfo(@Param('system') system: string) {
    return await this.environmentService.listEnvironments(system);
  }

  @Post(':system/:environment')
  async createEnvironment(@Param('system') system: string, @Param('environment') environment: string) {
    return await this.environmentService.createEnvironment(system, environment);
  }

  @Delete(':system/:environment')
  async deleteEnvironment(@Param('system') system: string, @Param('environment') environment: string) {
    return await this.environmentService.deleteEnvironment(system, environment);
  }
}
