import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title = 'search'
  const port = Number(process.env.SEARCH_TCP_PORT ?? 4012)
  const logger = new Logger('Search')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port
      }
    }
  );
  app.enableShutdownHooks();
  logger.log(`Media microservices (TCP) listing on port ${port}`);
  await app.listen();
}
bootstrap();
