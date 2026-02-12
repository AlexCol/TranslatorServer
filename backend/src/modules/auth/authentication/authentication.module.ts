import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthProvider } from './interfaces/AuthProvider';
import { RedmineProvider } from './providers/RedmineProvider';

@Module({
  providers: [
    AuthenticationService,
    {
      provide: AuthProvider,
      useClass: RedmineProvider,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
