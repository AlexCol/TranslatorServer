import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { SystemDto } from './dto/system.dto';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  async getSystemInfo() {
    return await this.systemService.listSystems();
  }

  @Post()
  async createSystem(@Body() systemDto: SystemDto) {
    return await this.systemService.createSystem(systemDto.system);
  }

  @Delete()
  async deleteSystem(@Body() systemDto: SystemDto) {
    return await this.systemService.deleteSystem(systemDto.system);
  }
}
