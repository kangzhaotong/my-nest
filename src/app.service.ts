import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  userInfo(): object {
    return {
      name: 'John Doe',
      age: 30,
      hobbies: ['Sports', 'Cooking'],
    };
  }
  tsetAPi(): Array<string> {
    return ['aaaa'];
  }
}
