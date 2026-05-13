import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UpdateCustomerSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    phone: z.string().length(10, 'Phone number must be 10 digits').optional(),
    email: z.email().optional(),
    lastVisitDate: z.coerce.date().optional(),
    notes: z.string().trim().max(200).optional(),
  })
  .strict();

export class UpdateCustomerDto extends createZodDto(UpdateCustomerSchema) {}
