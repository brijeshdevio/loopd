import { createZodDto } from 'nestjs-zod';
import { ShopCategory } from 'src/common/types/enum.types';
import { z } from 'zod';

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters'),
    phone: z.string().length(10, 'Phone number must be 10 digits'),
    shopName: z
      .string()
      .min(3, 'Shop name must be at least 3 characters')
      .max(30, 'Shop name must be less than 30 characters'),
    shopCategory: z.nativeEnum(ShopCategory).default(ShopCategory.OTHER),
  })
  .strict();

export class RegisterDto extends createZodDto(RegisterSchema) {}
