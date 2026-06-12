import fastifyStatic, { type FastifyStaticOptions } from '@fastify/static'
import type { FastifyInstance } from 'fastify'
import fs from 'node:fs'
import path from 'node:path'

export const autoConfig = (fastify: FastifyInstance): FastifyStaticOptions => {
  const dirPath = path.join(import.meta.dirname, '../../../..', fastify.config.CLIENT_DIRNAME)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  return {
    root: dirPath,
  }
}

export default fastifyStatic