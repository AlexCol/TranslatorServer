import { Injectable } from '@nestjs/common';
import { AuthProvider } from './interfaces/AuthProvider';
import { LoggedUser } from './types/loggedUser';

@Injectable()
export class AuthenticationService {
  constructor(private readonly authProvider: AuthProvider) {}

  async login(username: string, password: string): Promise<LoggedUser> {
    const loggedUser = await this.authProvider.validateUser(username, password);
    return loggedUser;
  }
}
