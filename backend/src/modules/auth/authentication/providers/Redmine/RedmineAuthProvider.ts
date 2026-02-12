import { BadRequestException } from '@nestjs/common';
import { AuthProvider } from '../../interfaces/AuthProvider';
import { LoggedUser } from '../../types/loggedUser';

export class RedmineAuthProvider extends AuthProvider {
  async validateUser(username: string, password: string): Promise<LoggedUser> {
    if (!password || !username) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const headers = { Authorization: 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64') };
    const response = await fetch('https://redmine.controlsoft.com.br/users/current.json', { headers });
    const { user } = await response.json();

    const loggedUser: LoggedUser = {
      id: user.id,
      login: user.login,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return loggedUser;
  }
}

/*
user redmine completo:
{
    "id": number,
    "login": string,
    "admin": boolean,
    "firstname": string,
    "lastname": string,
    "created_on": string,
    "updated_on": string,
    "last_login_on": string,
    "passwd_changed_on": string,
    "twofa_scheme": string | null,
    "api_key": string
}
*/
