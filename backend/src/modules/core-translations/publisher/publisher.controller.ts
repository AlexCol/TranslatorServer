import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PublishDto } from './dto/publish.dto';
import { PublisherService } from './publisher.service';
import { StringResponseDto } from '@/common/MessageResponseDto';
import { ApiDoc } from '@/decorators/api-doc/api-doc';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @ApiDoc({
    summary: 'Publish a namespace',
    description: 'Publishes a namespace to the translation service.',
    body: PublishDto,
    response: StringResponseDto,
  })
  @HttpCode(200)
  @Post('publish-namespace')
  async publishNamespace(@Body() body: PublishDto): Promise<StringResponseDto> {
    const data = await this.publisherService.publishNamespace(body);
    return { data };
  }
}
