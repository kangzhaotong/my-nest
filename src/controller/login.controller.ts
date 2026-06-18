import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { ResponseUtil } from '../common';

@Controller('/login')
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Get('/userInfo')
  getUserInfo(): object {
    const userInfo = this.appService.userInfo();
    return ResponseUtil.success(userInfo, '获取用户信息成功');
  }

  @Post('/testApi')
  testApi(): object {
    const result = this.appService.tsetAPi();
    return ResponseUtil.success(result, '测试接口调用成功');
  }
}
