import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('health')
  health() {
    return {
      ok: true,
      service: 'Getaway',
      now:new Date().toLocaleDateString()
    }
  }

}
