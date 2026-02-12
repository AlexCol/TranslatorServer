import { FastifyReply } from 'fastify';
import envConfig from 'src/env.config';

export default function addSessionCookie(res: FastifyReply, sessionToken: string, rememberMe?: boolean) {
  res.cookie('sessionToken', sessionToken, {
    httpOnly: true,
    secure: envConfig.nodeEnv === 'production',
    sameSite: envConfig.nodeEnv === 'production' ? 'strict' : 'lax', // ✅ 'lax' em dev
    path: '/',
    maxAge: rememberMe ? 604800 : undefined, // 7 dias ou sessão (cookie de sessão)
  });
}
