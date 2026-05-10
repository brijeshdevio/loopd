import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'OK';
  }

  getWelcome(): string {
    return 'Welcome to the backend!';
  }
}
