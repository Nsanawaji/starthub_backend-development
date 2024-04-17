import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    //THis means that any application that would use this api should use port 5000.
    //To make it accessible by anyone, set origin to '*'
    origin: 'http://localhost:5000',
  });
  const port = process.env.PORJECT_PORT;

  await app.listen(port, () => console.log('running on port:' + port));
}
bootstrap();
