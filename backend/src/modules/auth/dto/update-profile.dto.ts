import { createZodDto } from 'nestjs-zod';
import { ShopCategory } from 'src/common/types/enum.types';
import { z } from 'zod';

export const UpdateProfileSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name must be at least 3 characters')
      .max(30, 'Name must be less than 30 characters')
      .optional(),
    phone: z.string().length(10, 'Phone number must be 10 digits').optional(),
    shopName: z
      .string()
      .min(3, 'Shop name must be at least 3 characters')
      .max(30, 'Shop name must be less than 30 characters')
      .optional(),
    shopCategory: z.nativeEnum(ShopCategory).optional(),
    avatarUrl: z.url().optional(),
  })
  .strict();

export class UpdateProfileDto extends createZodDto(UpdateProfileSchema) {}
