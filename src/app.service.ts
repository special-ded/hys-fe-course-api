import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>ololo 777. DB user: ${process.env.DB_USER}</h1>`;
  }
}
