import { createZodDto } from 'nestjs-zod';
import { FollowUpPriority, FollowUpType } from 'src/common/types/enum.types';
import { z } from 'zod';

export const FollowUpSchema = z
  .object({
    type: z.nativeEnum(FollowUpType).default(FollowUpType.CALL),
    scheduledAt: z.coerce.date(),
    priority: z.nativeEnum(FollowUpPriority).default(FollowUpPriority.MEDIUM),
    notes: z.string().trim().min(1).max(100).optional(),
  })
  .strict();

export const CreateCustomerSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    phone: z.string().length(10, 'Phone number must be 10 digits'),
    email: z.email().optional(),
    lastVisitDate: z.coerce.date().optional(),
    notes: z.string().trim().max(200).optional(),
    followUp: FollowUpSchema.optional(),
  })
  .strict();

export class CreateCustomerDto extends createZodDto(CreateCustomerSchema) {}
