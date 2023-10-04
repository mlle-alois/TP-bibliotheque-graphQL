import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 3002;
  await app.listen(port, '0.0.0.0');
  logger.log(`Application started on port ${port}`);
  logger.log(await app.getUrl());
}
bootstrap();
