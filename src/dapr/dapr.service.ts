import { Injectable, Logger } from '@nestjs/common';
import { DaprClient } from '@dapr/dapr';

@Injectable()
export class DaprService {
  daprClient: DaprClient;
  private readonly logger = new Logger(DaprService.name);

  constructor(
  ) {
    const daprHost = "127.0.0.1"
    const daprPort = "3500"

    this.logger.log(`Initializing DaprClient("${daprHost}", ${daprPort})`);
    this.daprClient = new DaprClient({ daprHost, daprPort });
  }
}
