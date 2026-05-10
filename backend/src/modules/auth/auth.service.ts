import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import argon2 from 'argon2';
import { PRISMA_CODES } from 'src/constants/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

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
}
