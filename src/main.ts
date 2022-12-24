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
    origin: 'http://localhost:4200',
    credentials: true,
    "preflightContinue": false,
  });

  await app.listen(3000);
}
bootstrap();
