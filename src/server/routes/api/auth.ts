import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { UserSchema } from "../../../shared/schemas/user.ts";

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/auth",
    {
      schema: {
        response: {
          200: UserSchema,
          404: Type.Object({
            error: Type.String(),
          }),
        },
      },
    },
    async function (request, reply) {
      if (!request.session.user) {
        return reply.status(404).send({ error: "unauthorized" });
      }

      return reply
        .status(200)
        .send({ id: request.session.user.id, name: request.session.user.name });
    },
  );
};

export default plugin;
