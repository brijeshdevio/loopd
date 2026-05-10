import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import argon2 from 'argon2';
import { PRISMA_CODES } from 'src/constants/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export const DUMMY_HASH =
  '$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    try {
      const hashPassword = await argon2.hash(data.password);
      return await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashPassword,
          phone: data.phone,
          shopName: data.shopName,
          shopCategory: data.shopCategory,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          shopName: true,
          shopCategory: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(`Email or phone number already exists.`);
      }
      throw error;
    }
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const passwordHash = user?.password ?? DUMMY_HASH;
    const isPasswordValid = await argon2.verify(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwt.sign({
        sub: user.id,
        role: user.role,
      }),
    };
  }
}
