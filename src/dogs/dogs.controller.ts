import { DaprClient } from '@dapr/dapr';
import { Controller, Get, HttpCode, Inject, Req, Injectable } from '@nestjs/common';
//import { DaprService } from 'src/dapr/dapr.service';

@Controller('dogs')
@Injectable()
export class DogsController {

  readonly pubsubName = "dogpubsub"
  readonly pubsubTopic = "food"

  /** 
   * El microservicio que hace peticiones
   * no tiene necesidad de instanciar ni iniciar
   * un DaprServer, esto solo lo hace el micro que
   * escucha, en tal caso de que ud quiere que hable
   * y escuche ahi si debe instanciar DaprServer.
   * */
  constructor(
    //private readonly daprService: DaprService,
    @Inject('DaprClient')
    private readonly daprClient: DaprClient,
  ) { }

  @Get()
  @HttpCode(200)
  async dog(@Req() req): Promise<void> {
    const order = { ammount: 2 };
    console.log("Publishing data...");

    await this.daprClient.pubsub.publish(this.pubsubName, this.pubsubTopic, order)
      .then(() => {
        console.log("Se envio evento");
      })
      .catch((e) => {
        console.error(`Envio de evento fallo: ${e}`);
      });
    console.log("Data published...");
  }
}
