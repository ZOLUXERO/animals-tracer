import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { MyLoggerService } from "./customlogger.service";

@Module({
  exports: [MyLoggerService],
  providers: [MyLoggerService],
  imports: [
    LoggerModule.forRoot()
  ],
})
export class MyLoggerModule { }
