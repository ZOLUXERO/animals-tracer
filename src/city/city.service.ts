import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma } from "@prisma/client";
import { MyLoggerService } from "src/custom-logger/customlogger.service";

@Injectable()
export class CatsService {
  constructor(
    private prisma: PrismaService,
    private readonly myLoggerService: MyLoggerService
  ) { }
  private readonly logger = new Logger(CatsService.name);

  async getCat(
    catWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    this.logger.debug(`logger: Trayendo gato de postgresql... [id => ${catWhereUniqueInput.id}]`);
    this.myLoggerService.customLog(
      `customLog: Trayendo gato de postgresql... [id => ${catWhereUniqueInput.id}]`
    )
    return this.prisma.user.findUnique({
      where: catWhereUniqueInput,
    });
  }

  async createCat(data: Prisma.UserCreateInput): Promise<User> {
    this.logger.log(`Guardando gato [name => ${data.name}] en postgresql...`);
    return this.prisma.user.create({
      data,
    });
  }

}
