import { SessionPayload } from './UserSession';

export class SessionDataDto {
  sessionToken: string;
  userSession: SessionPayload;
}
