import Fastify from 'fastify'
import closeWithGrace from 'close-with-grace'
import fp from 'fastify-plugin'
import app from './app.ts';

function getLoggerOptions() {
  // Only if the program is running in an interactive terminal
  if (process.stdout.isTTY) {
    return {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
    }
  }

  return { level: process.env.LOG_LEVEL ?? 'silent' }
}

const f = Fastify({
  logger: getLoggerOptions(),
  connectionTimeout: 120_000,
  requestTimeout: 60_000,
  keepAliveTimeout: 10_000,
  http: {
    headersTimeout: 15_000
  },
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all'
    }
  }
})

f.register(fp(app))

closeWithGrace(
  { delay: 500 },
  async ({ err }) => {
    if (err != null) {
      f.log.error(err)
    }

    await f.close()
  }
)

await f.ready()

try {
  await f.listen({ host: "::", port: f.config.PORT })
} catch (err) {
  f.log.error(err)
  process.exit(1)
}