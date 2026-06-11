import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

import { QuestSchema } from '../../../shared/schemas/quest';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/quest/:id',
    {
      schema: {
        params: Type.Object({
          id: Type.String({ minLength: 1 }),
        }),
        response: {
          200: QuestSchema,
        },
      }
    },
    async function (request) {
      return this.dl.getQuestById(request.params.id)
    }
  )
}

export default plugin
