import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  async getSystemInfo() {
    return await this.systemService.listSystems();
  }

  @Post(':system')
  async createSystem(@Param('system') system: string) {
    return await this.systemService.createSystem(system);
  }

  @Delete(':system')
  async deleteSystem(@Param('system') system: string) {
    return await this.systemService.deleteSystem(system);
  }
}
