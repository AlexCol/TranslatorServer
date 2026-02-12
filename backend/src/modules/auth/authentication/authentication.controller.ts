import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const response = await this.service.login(loginDto.username, loginDto.password);
    return response;
  }
}
