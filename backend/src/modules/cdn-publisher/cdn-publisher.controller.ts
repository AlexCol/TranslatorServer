import { Body, Controller, Post } from '@nestjs/common';
import { CdnPublisherService } from './cdn-publisher.service';
import { CdnPublisherDto } from './dto/cdn-publisher.dto';

@Controller('cdn-publisher')
export class CdnPublisherController {
  constructor(private readonly cdnPublisherService: CdnPublisherService) {}

  @Post('push')
  async pushToCdn(@Body() body: CdnPublisherDto): Promise<string> {
    return await this.cdnPublisherService.pushToCdn(body.system, body.environment);
  }
}
