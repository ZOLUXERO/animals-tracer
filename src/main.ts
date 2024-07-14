import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { CatsController } from './cats/cats.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const startDapr = app.get(CatsController);
  //await startDapr.start();
  await app.listen(3000);
}
bootstrap();
