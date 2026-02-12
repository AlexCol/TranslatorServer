import { Controller, Get } from '@nestjs/common';
import { MessageResponseDto } from './common/MessageResponseDto';
import { ApiDoc } from './decorators/api-doc/api-doc';

@Controller()
export class AppController {
  constructor() {}

  @ApiDoc({
    summary: 'Health Check',
    description: 'Returns a simple message to confirm that the server is running.',
    response: MessageResponseDto,
  })
  @Get()
  getHello(): MessageResponseDto {
    return { message: 'Im alive!' };
  }
}
