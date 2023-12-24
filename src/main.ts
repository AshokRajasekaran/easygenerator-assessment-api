import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Easy Generator Assessment API SERVER')
    .setDescription('TO DO: Add description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
