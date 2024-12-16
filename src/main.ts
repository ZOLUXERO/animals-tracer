import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { otelSdk } from './otel/instrumentation.service';

async function bootstrap() {
  await otelSdk.start();
  const app = await NestFactory.create(AppModule);
  //const startDapr = app.get(CatsController);
  //await startDapr.start();
  await app.listen(3001);
}
bootstrap();
