import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { DogsController } from './dogs/dogs.controller';
import { DaprModule } from './dapr/dapr.module';
import { CatsService } from './cats/cats.service';
import { PrismaService } from './prisma/prisma.service';
import { MyLoggerModule } from './custom-logger/customlogger.module';
import { LoggerInjector } from './custo-logger-injector/logger-injector.service';
import { CityController } from './city/city.controller';

@Module({
  imports: [DaprModule, MyLoggerModule],
  controllers: [AppController, CatsController, CityController, DogsController],
  providers: [AppService, CatsService, PrismaService, LoggerInjector],
})
export class AppModule {
  constructor(private loggerInjector: LoggerInjector) {
    this.loggerInjector.inject();
  }
}
