import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const NoResponseFollowUpSchema = z
  .object({
    outcomeNotes: z.string().trim().min(1).max(200),
  })
  .strict();

export class NoResponseFollowUpDto extends createZodDto(
  NoResponseFollowUpSchema,
) {}
