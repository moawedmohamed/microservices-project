import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'media'
  const logger = new Logger('MediaMBootstrap')
  const port = Number(process.env.MEDIA_TCP_PORT ?? 4013)
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
    (
      MediaModule,
      {
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port
        }
      }
    );
  logger.log(`Media microservices (TCP) listing on port ${port}`)
  app.enableShutdownHooks()
  await app.listen();
}
bootstrap();
