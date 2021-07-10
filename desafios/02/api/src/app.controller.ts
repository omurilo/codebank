import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Route } from './models';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('routes')
  getRoutes(): Route[] {
    return this.appService.getRoutes();
  }
}
