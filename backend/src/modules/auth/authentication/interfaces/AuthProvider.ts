export abstract class AuthProvider {
  abstract validateUser(username: string, password: string): Promise<unknown>;
}
