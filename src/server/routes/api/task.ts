import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

import { QuestSchema } from '../../../shared/schemas/quest';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.put(
    '/task/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String({ minLength: 1 }),
        }),
        response: {
          200: QuestSchema,
          401: Type.String(),
        },
      }
    },
    async function (request, reply) {
      if (!request.session.user) {
        reply.status(401);
        return "Unauthorized";
      }
      return this.dl.completeTask(request.params.id, request.session.user?.id)
    }
  )
}

export default plugin
