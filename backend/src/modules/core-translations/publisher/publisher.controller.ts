import { Body, Controller, Post } from '@nestjs/common';
import { PublishDto } from './dto/publish.dto';
import { PublisherService } from './publisher.service';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post('publish-namespace')
  async publishNamespace(@Body() body: PublishDto): Promise<string> {
    return await this.publisherService.publishNamespace(body);
  }
}
