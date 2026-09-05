import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AllowUnauthorized } from '../auth/decorator/allow-unauthorized.decorator';
import { DatabaseService } from '../database/service/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  @AllowUnauthorized()
  async check() {
    try {
      // Lightest possible real query — just confirms the connection/adapter is alive.
      // Adjust the model name if `dedicatedStorage` isn't accessible directly off
      // the proxy-based DatabaseService the same way as your other services use it.
      await this.db.dedicatedStorage.count();
      return { status: 'ok', db: 'ok', timestamp: new Date().toISOString() };
    } catch (err) {
      throw new HttpException(
        { status: 'error', db: 'unreachable', message: (err as Error).message },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}