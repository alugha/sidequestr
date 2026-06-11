import {
  type FastifyPluginAsyncTypebox,
  Type
} from '@fastify/type-provider-typebox'

import { QuestSchema } from '../../schemas/quest';
import { quests } from '../../staticdata'

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
    async function (request, reply) {
//      if (!request.session.user) {
//       reply.status(400);
//        return { error: "need to be logged in" }
//      }

      return quests.map(quest => {
        return {
            ...quest,
            tasks: quest.tasks.map(t => {
            return {
                ...t,
                required: t.required ?? [],
                completed: t.completed === undefined ? false : t.completed //FIXME: this is here for testing only!
            }})
        }})
    }
  )
}

export default plugin
