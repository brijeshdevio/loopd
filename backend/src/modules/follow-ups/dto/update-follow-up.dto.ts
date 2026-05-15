import { createZodDto } from 'nestjs-zod';
import { FollowUpPriority, FollowUpType } from 'src/common/types/enum.types';
import { z } from 'zod';

export const UpdateFollowUpSchema = z
  .object({
    type: z.nativeEnum(FollowUpType).optional(),
    scheduledAt: z.coerce.date().optional(),
    priority: z.nativeEnum(FollowUpPriority).optional(),
    notes: z.string().trim().min(1).max(100).optional(),
  })
  .strict();

export class UpdateFollowUpDto extends createZodDto(UpdateFollowUpSchema) {}
