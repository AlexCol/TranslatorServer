import { SessionPayload } from '../dto/UserSession';

export type SessionData = {
  payload: SessionPayload;
  createdAt: number;
  expiresAt: number;
};
