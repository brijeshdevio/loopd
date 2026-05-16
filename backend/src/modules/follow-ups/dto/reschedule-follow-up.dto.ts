import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RescheduleFollowUpSchema = z
  .object({
    scheduledAt: z.coerce.date(),
    notes: z.string().trim().min(1).max(200).optional(),
  })
  .strict();

export class RescheduleFollowUpDto extends createZodDto(
  RescheduleFollowUpSchema,
) {}
