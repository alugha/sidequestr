import helmet, { type FastifyHelmetOptions } from '@fastify/helmet'

export const autoConfig: FastifyHelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      imgSrc: ["'self'", "data:", "blob:"],
      mediaSrc: ["'self'", "blob:", "data:"],
      workerSrc: ["'self'", "blob:"],
      scriptSrc: ["'self'", "'wasm-unsafe-eval'", "https://fastly.jsdelivr.net"],
      connectSrc: ["'self'", "https://fastly.jsdelivr.net"],
    },
  }
}

export default helmet