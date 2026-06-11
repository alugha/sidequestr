import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

import { QuestSchema } from '../../../shared/schemas/quest';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/quests',
    {
      schema: {
        response: {
          200: Type.Array(QuestSchema),
          400: Type.Object({
            error: Type.String()
          })
        },
      }
    },
    async function () {
      //      if (!request.session.user) {
      //       reply.status(400);
      //        return { error: "need to be logged in" }
      //      }

      const quests = this.dl.getAllQuests().map(quest => ({
        ...quest,
        tasks: this.dl.getAllTasks(quest.id),
      }))

      return quests;
    }
  )
}

export default plugin
