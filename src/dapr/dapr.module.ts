import { Module } from "@nestjs/common";
//import { DaprService } from "./dapr.service";
import { DaprClient, DaprServer } from "@dapr/dapr";

@Module({
  imports: [],
  // List of imported modules

  // List of controllers
  controllers: [],

  // Providers that will be instantiated by the Nest injector and that may be shared at least across this module
  //providers: [DaprService],
  providers: [
    {
      provide: 'DaprServer',
      useValue: new DaprServer({ serverPort: '3003' }),
    },
    {
      provide: 'DaprClient',
      useValue: new DaprClient(),
    }
  ],

  // which providers can be used in other modules?
  //exports: [DaprService]
  exports: ['DaprClient', 'DaprServer'],
})
export class DaprModule { }
