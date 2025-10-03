import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { UserPayload, UserWithToken } from './types';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserPayload> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordIsMatch = await argon2.verify(user.password, pass);
    if (user && passwordIsMatch) {
      const { password: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Wrong email or password');
  }

  login(user: UserPayload) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserWithToken> {
    const newUserWithPassword = await this.userService.create(createUserDto);

    const { password: _, ...userPayload } = newUserWithPassword;

    const tokenPayload = this.login(userPayload as UserPayload);

    return {
      user: userPayload as UserPayload,
      token: tokenPayload.token,
    };
  }
}
