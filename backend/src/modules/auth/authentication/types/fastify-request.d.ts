import 'fastify';
import { SessionPayload } from '../../../session/interfaces/sessions-payload';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      payload: SessionPayload;
    };
  }
}

// lembrar de adicionar
//   "include": [
//     "src/**/*",
//     "src/**/*.d.ts"
//   ]
// no tsconfig.json para que o TypeScript reconheça este arquivo de declaração.
//! pode não ser necessário
