import { DaprServer, HttpMethod, DaprClient } from '@dapr/dapr';
import { Controller, Get, Req, Injectable, Inject } from '@nestjs/common';
//import { DaprService } from 'src/dapr/dapr.service';
import axios from 'axios';

@Controller('cats')
@Injectable()
export class CatsController {

  constructor(
    //@Inject('DaprServer')
    //private readonly daprServer: DaprServer,
    @Inject('DaprClient')
    private readonly daprClient: DaprClient,
  ) { }

  /** 
   * El microservicio que hace peticiones
   * no tiene necesidad de instanciar ni iniciar
   * un DaprServer, esto solo lo hace el micro que
   * escucha, en tal caso de que ud quiere que hable
   * y escuche ahi si debe instanciar DaprServer.
   * */
  //async start() {
  //  await this.daprServer.start().then(() => {
  //    console.log("epaaa iniciado daprServer...");
  //  });
  //}

  @Get()
  async getCatFoot(@Req() req): Promise<void> {
    console.log("Dapr request...");
    const r2 = await this.daprClient.invoker.invoke(
      "animals-food",
      "hello-world",
      HttpMethod.GET
    );
    console.log(`Response to GET request: ${JSON.stringify(r2)}`);
    //const daprPort = process.env.DAPR_HTTP_PORT || 3500;
    //const url = `http://localhost:${daprPort}/v1.0/invoke/animals-food/method/cat-food`;
    //const res = await axios.get(url);
    //console.log("get cat food: " + res.data);
  }
}
