import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
@Controller('/login')
//
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Get('/userInfo')
  getUserInfo(): object {
    return this.appService.userInfo();
  }
  @Post('/testApi')
  testApi(): Array<string> {
    return this.appService.tsetAPi();
  }
}
