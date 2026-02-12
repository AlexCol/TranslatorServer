import fastifyCookie from '@fastify/cookie';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export default async function setCookies(app: NestFastifyApplication) {
  await app.register(fastifyCookie, { secret: '' });
}
