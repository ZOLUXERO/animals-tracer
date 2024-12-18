import { CanActivate, ExecutionContext, Injectable, ForbiddenException, Logger } from '@nestjs/common';

@Injectable()
export class ApiGuard implements CanActivate {

  private readonly logger = new Logger(ApiGuard.name);

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug('🦍 REY MONO INTERCEPTAR PETICION Y REVISAR TOKEN UGAH UGAH!!! 🦍');
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    if (apiKey !== process.env.SECURE_API_KEY) {
      throw new ForbiddenException('🦍 REY MONO NO GUSTAR API KEY 🦍');
    }
    return true;
  }
}

