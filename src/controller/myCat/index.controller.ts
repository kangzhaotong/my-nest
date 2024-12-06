import { Controller, Get, Req, Res, Param, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { MyCatService } from '../../services/myCat.serve';
import { AppService } from '../../app.service';
@Controller('/myCat')
export class MyCatController {
  constructor(
    private readonly myCatServe: MyCatService,
    private readonly appService: AppService,
  ) {}

  @Get('/findCat')
  findCatInfo(): string {
    return this.myCatServe.findCat();
  }
  @Get('/userInfo')
  userInfo(): object {
    return this.appService.userInfo();
  }
  // 2. 如何获取get的query参数和parma参数
  @Get('getQueryAndParam/:id?')
  getQuery(
    @Param('id') params: string,
    @Query() query: { value: number; qx: number },
  ): any {
    // 实际上你可以直接通过req去拿，当然通过注入也是可以的
    console.log('params', params);
    console.log('query', query);
    return '2222';
  }
}
