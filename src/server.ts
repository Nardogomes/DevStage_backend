import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
  origin: true,
});

app.register(fastifySwagger);

app.get("/hello", () => {
  return { hello: "world" };
});

app.post(
  "/subscriptions",
  {
    schema: {
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
);

app.listen({ port: 3333 }, () => {
  console.log("Server running at http://localhost:3333/");
});
