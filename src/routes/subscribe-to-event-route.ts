import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/subscriptions",
    {
      schema: {
        summary: "Subscribe someone to the event",
        tags: ["subscriptions"],
        body: z.object({
          name: z.string().min(3).max(255),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string().min(3).max(255),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
  
      return reply.status(201).send({ name, email });
    }
  )
};