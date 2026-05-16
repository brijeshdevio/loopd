import { createZodDto } from 'nestjs-zod';
import { FollowUpPriority, FollowUpType } from 'src/common/types/enum.types';
import { z } from 'zod';

export const DoneFollowUpSchema = z
  .object({
    outcomeNotes: z.string().trim().min(1).max(200),
    nextFollowUp: z
      .object({
        type: z.nativeEnum(FollowUpType).default(FollowUpType.CALL),
        scheduledAt: z.coerce.date(),
        priority: z
          .nativeEnum(FollowUpPriority)
          .default(FollowUpPriority.MEDIUM),
        notes: z.string().trim().min(1).max(200).optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export class DoneFollowUpDto extends createZodDto(DoneFollowUpSchema) {}
