import { Injectable, HttpStatus } from '@nestjs/common';
interface arrType {
  name: string;
  age: number;
  hobbies: Array<string>;
  [key: string]: any;
}

@Injectable()
export class UserService {
  getUserInfo(id): Array<arrType> {
    const arr: arrType[] = [
      {
        code: HttpStatus.OK,
        mgs: id,
        name: 'John Doe',
        age: 30,
        hobbies: ['Sports', 'Cooking'],
        a: 'asad',
      },
    ];
    return arr;
  }
}
