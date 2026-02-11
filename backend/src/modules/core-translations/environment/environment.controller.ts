import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EnvironmentDto } from './dto/environment.dto';
import { EnvironmentService } from './environment.service';

@Controller('environment')
export class EnvironmentController {
  constructor(private readonly environmentService: EnvironmentService) {}

  @Get(':system')
  async getSystemInfo(@Param('system') system: string) {
    return await this.environmentService.listEnvironments(system);
  }

  @Post()
  async createEnvironment(@Body() dto: EnvironmentDto) {
    return await this.environmentService.createEnvironment(dto.system, dto.environment);
  }

  @Delete()
  async deleteEnvironment(@Body() dto: EnvironmentDto) {
    return await this.environmentService.deleteEnvironment(dto.system, dto.environment);
  }
}
