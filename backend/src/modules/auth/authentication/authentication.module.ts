import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AuthProvider } from './interfaces/AuthProvider';
import { MockAuthProvider } from './providers/Mock/MockProvider';

@Module({
  providers: [
    AuthenticationService,
    {
      provide: AuthProvider,
      useClass: MockAuthProvider, //RedmineAuthProvider,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
