import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
