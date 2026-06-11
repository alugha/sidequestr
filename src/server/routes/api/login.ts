import { randomUUID } from 'node:crypto'
import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'
import { LoginSchema } from '../../../shared/schemas/auth.ts'
import { UserSchema } from '../../../shared/schemas/user.ts'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    '/login',
    {
      schema: {
        body: LoginSchema,
        response: {
          200: UserSchema,
          400: Type.Object({
            error: Type.String()
          })
        },
      }
    },
    async function (request, reply) {
      if (request.session.user) {
        reply.status(400);
        return { error: "already logged in" }
      }

      const { name } = request.body

      request.session.user = { id: randomUUID(), name };
      await request.session.save();

      return {
        name
      }
    }
  )
}

export default plugin