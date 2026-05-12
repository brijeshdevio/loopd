import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { FindCustomersQueryDto } from './dto/find-customers-query.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async findCustomers(ownerId: string, query: FindCustomersQueryDto) {
    const where: Record<string, unknown> = { ownerId };
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
      where.phone = { contains: query.search, mode: 'insensitive' };
    }

    const skip = (query.page - 1) * query.limit;
    const take = query.limit;
    const [total, customers] = await Promise.all([
      this.prisma.customer.count({ where }),
      this.prisma.customer.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          lastVisitDate: true,
          notes: true,
          createdAt: true,
          followUps: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              id: true,
              scheduledAt: true,
              status: true,
              type: true,
            },
          },
        },
      }),
    ]);

    return {
      customers,
      meta: {
        total,
        totalPages: Math.ceil(total / query.limit),
        page: query.page,
        limit: query.limit,
      },
    };
  }
}
