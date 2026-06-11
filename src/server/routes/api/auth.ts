import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'
import { UserSchema } from '../../../shared/schemas/user.ts'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/auth',
    {
      schema: {
        response: {
          200: UserSchema,
          404: Type.Object({
            error: Type.String()
          })
        },
      }
    },
    async function (request, reply) {
      if (!request.session.user) {
        reply.status(404);
        return { error: "unauthorized" }
      }

      return { name: request.session.user.name };
    }
  )
}

export default plugin