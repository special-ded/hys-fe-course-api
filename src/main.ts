import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // transform: true
  }));

  app.enableCors({
    allowedHeaders: '*',
    origin: ['http://localhost:4200', 'https://bormash1991.github.io'],
    credentials: true,
    "preflightContinue": false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
  });

  await app.listen(3000);
}
bootstrap();
