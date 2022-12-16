import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ololo 777. DB user: ' + process.env.DB_USER;
  }
}
