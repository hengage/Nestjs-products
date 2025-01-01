import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(CorsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
