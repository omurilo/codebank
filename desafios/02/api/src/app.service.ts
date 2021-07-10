import { Injectable } from '@nestjs/common';
import { Route } from './models';

import { routes } from './routes.json';

@Injectable()
export class AppService {
  getRoutes(): Route[] {
    return routes;
  }
}
