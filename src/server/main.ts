import Fastify from 'fastify'

const app = Fastify({
  logger: true,
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

await app.ready()

try {
  await app.listen({ host: "::", port: 3000 })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}