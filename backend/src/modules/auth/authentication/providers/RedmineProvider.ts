import { AuthProvider } from '../interfaces/AuthProvider';

export class RedmineProvider extends AuthProvider {
  async validateUser(username: string, password: string): Promise<unknown> {
    // Implement Redmine-specific user validation logic here
    return {};
  }
}
