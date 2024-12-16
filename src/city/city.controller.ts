import { DaprServer, HttpMethod, DaprClient } from '@dapr/dapr';
import { Controller, Get, Req, Injectable, Inject, Param, Post, Body, Query } from '@nestjs/common';

@Controller('cities')
@Injectable()
export class CityController {

  constructor(
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

  @Get()
  async getCatFoot(@Req() req): Promise<void> {
    console.log("Dapr request...");
    const r2 = await this.daprClient.invoker.invoke(
      "animals-food",
      "hello-world",
      HttpMethod.GET
    );
    console.log(`Response to GET request: ${JSON.stringify(r2)}`);
  }

  @Get('city')
  async getCity(@Query('search') search: string) {
    const cities = [
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
      "Cartagena",
      "Cúcuta",
      "Bucaramanga",
      "Pereira",
      "Manizales",
      "Santa Marta",
      "Ibagué",
      "Villavicencio",
      "Armenia",
      "Neiva",
      "Pasto",
      "Montería",
      "Sincelejo",
      "Valledupar",
      "Popayán",
      "Tunja",
      "Florencia",
      "Riohacha",
      "Quibdó",
      "San Andrés",
      "Yopal",
      "Mocoa",
      "Inírida",
      "Puerto Carreño",
      "Leticia"
    ];
    return {
      "sugg": cities.filter((city) =>
        city.toLowerCase().includes(search.toLowerCase())
      )
    }
  }
}
