import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { DogsController } from './dogs/dogs.controller';
import { DaprModule } from './dapr/dapr.module';
import { CatsService } from './cats/cats.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [DaprModule],
  controllers: [AppController, CatsController, DogsController],
  providers: [AppService, CatsService, PrismaService],
})
export class AppModule { }
