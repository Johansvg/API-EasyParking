import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // configuracion de cors: recibe peticiones de cualquier origen
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    forbidNonWhitelisted : true,
    transform : true,
    })
  );
  
  await app.listen(3000);
}
bootstrap();
