import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const FindFollowUpsQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(50, 'Limit must be less than 50')
      .default(10),
  })
  .strict();

export class FindFollowUpsQueryDto extends createZodDto(
  FindFollowUpsQuerySchema,
) {}
