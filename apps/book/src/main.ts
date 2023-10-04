import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { environmentConfig } from './config/book-environment.config';
import { BookModule } from './book.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(BookModule);
  const port = environmentConfig.port;
  await app.listen(port, '0.0.0.0');
  logger.log(`Application started on port ${port}`);
  logger.log(await app.getUrl());
}
bootstrap();
