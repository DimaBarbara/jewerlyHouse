import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword: string = await argon2.hash(createUserDto.password);

    const userWithCart = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          surname: createUserDto.surname,
          password: hashedPassword,
        },
      });

      await tx.cart.create({
        data: {
          userId: newUser.id,
        },
      });

      const userResult = await tx.user.findUniqueOrThrow({
        where: { id: newUser.id },
        include: {
          cart: {
            include: {
              cartItems: true,
            },
          },
        },
      });

      return userResult;
    });
    return userWithCart;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
