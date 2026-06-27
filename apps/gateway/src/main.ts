import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { Logger } from "@nestjs/common";
import { env } from "process";

async function bootstrap() {
  process.title = 'getaway';
  const logger = new Logger('GetawayBootstrap')
  const app = await NestFactory.create(GatewayModule)
  app.enableShutdownHooks();
  const port = Number(process.env.GETAWAY_PORT ?? 3000)
  await app.listen(port)
  logger.log(`Getaway running at port ${port}`)
}
bootstrap();