import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("App Routes")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/live")
  checkServer(): string {
    return this.appService.checkServer();
  }
}
