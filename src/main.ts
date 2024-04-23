import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    //This means that any application that would use this api should use port 5000.
    //To make it accessible by anyone, set origin to '*'
    origin: 'http://localhost:5000',
  });
  const port = process.env.PROJECT_PORT;

  await app.listen(port, () => console.log('running on port:' + port));
}
bootstrap();
