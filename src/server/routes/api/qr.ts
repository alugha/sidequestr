import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { QRCodeJs } from "@qr-platform/qr-code.js/node";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/quest/:questId/task/:taskId/qr",
    {
      schema: {
        params: Type.Object({
          questId: Type.String({ minLength: 1 }),
          taskId: Type.String({ minLength: 1 }),
        }),
        response: {
          200: Type.String(),
          404: Type.String(),
          500: Type.String(),
        },
      },
    },
    async function (request, reply) {
      const { taskId, questId } = request.params;
      const tasks = this.dl.getAllTasks(questId).filter((t) => t.id === taskId);
      if (tasks.length !== 1) {
        return reply
          .code(404)
          .send(`Couldn't find task ${taskId}`);
      }
      const [task] = tasks;

      const qr = new QRCodeJs({
        data: JSON.stringify({ id: task.id, displayName: task.displayName }),
      });

      const payload = await qr.serialize();
      return payload != null
        ? reply.code(200).header("content-type", "image/svg").send(payload)
        : reply.code(500).send("failed to serialize as SVG");
    },
  );
};

export default plugin;
