import Fastify from 'fastify'
import closeWithGrace from 'close-with-grace'

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

const app = Fastify({
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

closeWithGrace(
  { delay: 500 },
  async ({ err }) => {
    if (err != null) {
      app.log.error(err)
    }

    await app.close()
  }
)

await app.ready()

try {
  await app.listen({ host: "::", port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}