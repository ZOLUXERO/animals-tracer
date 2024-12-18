import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otelSdk } from './otel/instrumentation.service';
//import { daprServerStart } from './dapr/dapr.service';

async function bootstrap() {
  otelSdk.start();
  const app = await NestFactory.create(AppModule);
  //const startDapr = app.get(CatsController);
  //await startDapr.start();
  //await daprServerStart();
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
