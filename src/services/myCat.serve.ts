import { Injectable } from '@nestjs/common';

@Injectable()
export class MyCatService {
  findCat = () => {
    return 'findCat';
  };
}
