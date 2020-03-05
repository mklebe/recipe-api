import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const dotenv = require('dotenv')

declare const module: any

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule)
  const ingredientOptions = new DocumentBuilder()
    .setTitle('Recipe Book API')
    .setDescription('Documentation of REST Endpoints')
    .setVersion('1.0')
    .addTag('ingredient')
    .addTag('recipe')
    .build()

  const ingredientDocument = SwaggerModule.createDocument(app, ingredientOptions)
  
  SwaggerModule.setup('api', app, ingredientDocument)
  
  
  app.enableCors()
  await app.listen( process.env.APPLICATION_PORT );
}
bootstrap();
