import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    // https://github.com/kelektiv/node.bcrypt.js#readme
    if (user && user.password === pass) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  // TODO ENDED HERE With this in mind, we can now finally generate a real JWT
  async login(user: any) {
    // const payload = { username: user._doc.username, sub: user._doc._id };

    return {
      access_token: this.jwtService.sign(user._doc),
    };
  }
}
