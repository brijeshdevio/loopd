import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be less than 64 characters'),
  })
  .refine((data) => {
    if (data.newPassword === data.currentPassword) {
      return {
        message: 'New password must be different from the current password',
        path: ['newPassword'],
      };
    }
    return true;
  })
  .strict();

export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}
