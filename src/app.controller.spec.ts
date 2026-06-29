import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './controller/app.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.serve';

describe('AppController', () => {
  let appController: AppController;
  const userInfo = [{ name: 'John Doe' }];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: UserService,
          useValue: {
            getUserInfo: jest.fn().mockReturnValue(userInfo),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return user info response', () => {
      expect(appController.getHello('2')).toEqual(
        expect.objectContaining({
          code: 200,
          message: '获取用户信息成功',
          data: userInfo,
        }),
      );
    });
  });
});
