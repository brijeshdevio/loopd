import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async stats(ownerId: string) {
    const now = new Date();

    // Start of today
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    // End of today
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    // Start of this week
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Start of last week
    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    const [
      totalCustomers,
      newCustomersThisWeek,
      todayFollowUpsCount,
      todayPending,
      overdueCount,
      doneThisWeek,
      doneLastWeek,
      todayFollowUps,
      overdueFollowUps,
      upcomingFollowUps,
    ] = await Promise.all([
      // Total customers
      this.prisma.customer.count({
        where: { ownerId },
      }),

      // New customers this week
      this.prisma.customer.count({
        where: {
          ownerId,
          createdAt: {
            gte: startOfWeek,
          },
        },
      }),

      // Today's followups
      this.prisma.followUp.count({
        where: {
          ownerId,
          scheduledAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),

      // Today's pending
      this.prisma.followUp.count({
        where: {
          ownerId,
          status: 'PENDING',
          scheduledAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
      }),

      // Overdue followups
      this.prisma.followUp.count({
        where: {
          ownerId,
          status: {
            not: 'DONE',
          },
          scheduledAt: {
            lt: startOfToday,
          },
        },
      }),

      // Done this week
      this.prisma.followUp.count({
        where: {
          ownerId,
          status: 'DONE',
          updatedAt: {
            gte: startOfWeek,
          },
        },
      }),

      // Done last week
      this.prisma.followUp.count({
        where: {
          ownerId,
          status: 'DONE',
          updatedAt: {
            gte: startOfLastWeek,
            lt: startOfWeek,
          },
        },
      }),

      // Today followups list
      this.prisma.followUp.findMany({
        where: {
          ownerId,
          scheduledAt: {
            gte: startOfToday,
            lte: endOfToday,
          },
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        orderBy: {
          scheduledAt: 'asc',
        },
      }),

      // Overdue followups list
      this.prisma.followUp.findMany({
        where: {
          ownerId,
          status: {
            not: 'DONE',
          },
          scheduledAt: {
            lt: startOfToday,
          },
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        orderBy: {
          scheduledAt: 'asc',
        },
      }),

      // Upcoming followups
      this.prisma.followUp.findMany({
        where: {
          ownerId,
          scheduledAt: {
            gt: endOfToday,
          },
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
        take: 10,
        orderBy: {
          scheduledAt: 'asc',
        },
      }),
    ]);

    return {
      stats: {
        totalCustomers,
        newCustomersThisWeek,
        todayFollowUps: todayFollowUpsCount,
        todayPending,
        overdueCount,
        doneThisWeek,
        doneLastWeek,
      },
      todayFollowUps,
      overdueFollowUps: overdueFollowUps.map((item) => ({
        ...item,
        daysOverdue: Math.floor(
          (now.getTime() - new Date(item.scheduledAt).getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      })),
      upcomingFollowUps,
    };
  }
}
