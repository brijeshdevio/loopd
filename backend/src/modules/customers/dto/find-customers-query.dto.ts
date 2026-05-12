import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const FindCustomersQuerySchema = z
  .object({
    search: z
      .string()
      .trim()
      .min(1)
      .max(40, 'Search must be less than 40 characters')
      .optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(50, 'Limit must be less than 50')
      .default(10),
  })
  .strict();

export class FindCustomersQueryDto extends createZodDto(
  FindCustomersQuerySchema,
) {}
