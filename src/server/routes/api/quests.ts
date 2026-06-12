import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

import { QuestSchema } from '../../../shared/schemas/quest.ts';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/quests',
    {
      schema: {
        response: {
          200: Type.Array(QuestSchema),
        },
      }
    },
    async function (request) {
      return this.dl.getAllQuests(request.session.user?.id);
    }
  )
}

export default plugin
