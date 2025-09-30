import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    return result;
  }
}
