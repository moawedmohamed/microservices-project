import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'search'
const rmqURL = process.env.RABBITMQ_URL ?? "amqp://localhost:5672";

  const queue = process.env.SEARCH_QUEUE ?? 'search_queue'
  const logger = new Logger('Search')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.RMQ,
      options: {
        urls:[rmqURL],
        queue,
        queueOptions: {
          durable: false
        }
      }
    }
  );
  app.enableShutdownHooks();
  logger.log(`Search RMQ listening on queue ${queue} via ${rmqURL }`)
  await app.listen();
}
void bootstrap();
