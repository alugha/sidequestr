import { randomUUID } from 'node:crypto'
import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'
import { LoginSchema } from '../../schemas/auth.ts'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    '/login',
    {
      schema: {
        body: LoginSchema,
        response: {
          200: Type.Object({
            message: Type.Optional(Type.String())
          }),
          400: Type.Object({
            message: Type.String()
          })
        },
        tags: ['Authentication']
      }
    },
    async function (request, reply) {
      if (request.session.user) {
        reply.status(400);
        return { message: "already logged in" }
      }

      const { name } = request.body

      request.session.user = { id: randomUUID(), name };

      // TODO: persist into DB

      return {
        message: "success",
      }
    }
  )
}

export default plugin