import env from '@fastify/env'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number;
      COOKIE_SECRET: string;
      COOKIE_NAME: string;
      COOKIE_SECURED: boolean;
      RATE_LIMIT_MAX: number;
      SQLITE_PATH: string;
      CLIENT_DIRNAME: string;
    };
  }
}

const schema = {
  type: 'object',
  required: [
    'PORT',
    'RATE_LIMIT_MAX',
    'COOKIE_SECRET',
    'COOKIE_NAME',
    'COOKIE_SECURED'
  ],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    RATE_LIMIT_MAX: {
      type: 'number',
      default: 100
    },
    COOKIE_SECRET: {
      type: 'string'
    },
    COOKIE_NAME: {
      type: 'string'
    },
    COOKIE_SECURED: {
      type: 'boolean',
      default: true
    },
    SQLITE_PATH: {
      type: 'string',
    },
    CLIENT_DIRNAME: {
      type: 'string',
      default: './src/client/dist'
    }
  }
}

export const autoConfig = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env
}

export default env