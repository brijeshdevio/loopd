import { createZodDto } from 'nestjs-zod';
import { FollowUpPriority, FollowUpType } from 'src/common/types/enum.types';
import { z } from 'zod';

export const CreateFollowUpSchema = z
  .object({
    customerId: z.string().length(25, 'Customer ID must be 25 characters'),
    type: z.nativeEnum(FollowUpType).default(FollowUpType.CALL),
    scheduledAt: z.coerce.date(),
    priority: z.nativeEnum(FollowUpPriority).default(FollowUpPriority.MEDIUM),
    notes: z.string().trim().min(1).max(100).optional(),
  })
  .strict();

export class CreateFollowUpDto extends createZodDto(CreateFollowUpSchema) {}
