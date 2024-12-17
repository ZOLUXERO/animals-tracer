import { Inject, Injectable, Logger } from '@nestjs/common';
import { DaprClient, DaprServer } from '@dapr/dapr';

@Injectable()
export class DaprService {
  daprClient: DaprClient;
  private readonly logger = new Logger(DaprService.name);

  constructor(
    //@Inject('DaprServer') private readonly daprServer: DaprServer,
  ) {
    const daprHost = "127.0.0.1"
    const daprPort = "3500"

    this.logger.log(`Initializing DaprClient("${daprHost}", ${daprPort})`);
    this.daprClient = new DaprClient({ daprHost, daprPort });
  }
}

//export async function daprServerStart() {
//  const daprServer = new DaprServer({
//    serverPort: '3003',
//    serverHttp: '3001',
//  });
//  await this.daprServer.start().then(() => {
//    this.logger.log('[Escuchando] Conectado a dapr...');
//  });
//}
