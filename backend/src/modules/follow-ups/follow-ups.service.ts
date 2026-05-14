import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { FindFollowUpsQueryDto } from './dto/find-follow-up-query.dto';

@Injectable()
export class FollowUpsService {
  constructor(private readonly prisma: PrismaService) {}

  async findFollowUps(ownerId: string, query: FindFollowUpsQueryDto) {
    const where: Record<string, unknown> = { ownerId };
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    const [total, followUps] = await Promise.all([
      this.prisma.followUp.count({ where }),
      this.prisma.followUp.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          type: true,
          status: true,
          priority: true,
          scheduledAt: true,
          completedAt: true,
          notes: true,
          outcomeNotes: true,
          createdAt: true,
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      followUps,
      meta: {
        total,
        totalPages: Math.ceil(total / query.limit),
        page: query.page,
        limit: query.limit,
      },
    };
  }
}
