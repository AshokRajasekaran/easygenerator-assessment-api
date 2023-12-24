import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ErrorHandler } from './utils/error-response';

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
    .setDescription('Easy Generator API DOcs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
  app.useGlobalFilters(new ErrorHandler());
  await app.listen(process.env.PORT);
}
bootstrap();
