import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PRISMA_CODES } from 'src/constants/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateFollowUpDto } from './dto/create-follow-up.dto';
import { DoneFollowUpDto } from './dto/done-follow-up.dto';
import { FindFollowUpsQueryDto } from './dto/find-follow-up-query.dto';
import { RescheduleFollowUpDto } from './dto/reschedule-follow-up.dto';
import { UpdateFollowUpDto } from './dto/update-follow-up.dto';

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

  async findFollowUpById(ownerId: string, followUpId: string) {
    const followUp = await this.prisma.followUp.findUnique({
      where: {
        id: followUpId,
        ownerId,
      },
      select: {
        id: true,
        type: true,
        status: true,
        priority: true,
        scheduledAt: true,
        completedAt: true,
        notes: true,
        outcomeNotes: true,
        parentFollowUpId: true,
        createdAt: true,
        customer: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            notes: true,
          },
        },
      },
    });

    if (!followUp) {
      throw new ForbiddenException(
        'You do not have permission to access this follow up.',
      );
    }
    return followUp;
  }

  async createFollowUp(ownerId: string, data: CreateFollowUpDto) {
    try {
      return await this.prisma.followUp.create({
        data: {
          ownerId,
          customerId: data.customerId,
          type: data.type,
          priority: data.priority,
          scheduledAt: data.scheduledAt,
          notes: data.notes,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException(
            'You do not have permission to access this customer.',
          );
        }
      }
      throw error;
    }
  }

  async updateFollowUp(
    ownerId: string,
    followUpId: string,
    data: UpdateFollowUpDto,
  ) {
    const followUp = await this.prisma.followUp.findUnique({
      where: {
        id: followUpId,
        ownerId,
      },
    });

    if (!followUp) {
      throw new ForbiddenException(
        'You do not have permission to access this follow up.',
      );
    }

    if (followUp.status === 'DONE') {
      throw new ForbiddenException('You cannot update a completed follow up.');
    }

    return await this.prisma.followUp.update({
      where: {
        id: followUpId,
        ownerId,
      },
      data: { ...data },
      select: {
        id: true,
        type: true,
        status: true,
        priority: true,
        scheduledAt: true,
        notes: true,
      },
    });
  }

  async doneFollowUp(
    ownerId: string,
    followUpId: string,
    data: DoneFollowUpDto,
  ) {
    const followUp = await this.prisma.followUp.findUnique({
      where: {
        id: followUpId,
        ownerId,
      },
    });

    if (!followUp) {
      throw new ForbiddenException(
        'You do not have permission to access this follow up.',
      );
    }

    if (followUp.status === 'DONE') {
      throw new ForbiddenException('You cannot update a completed follow up.');
    }

    const updatedFollowUp = await this.prisma.followUp.update({
      where: {
        id: followUpId,
        ownerId,
      },
      data: { outcomeNotes: data.outcomeNotes, status: 'DONE' },
      select: {
        id: true,
        status: true,
        completedAt: true,
        outcomeNotes: true,
      },
    });

    if (!data.nextFollowUp) {
      return { followUp };
    }

    const nextFollowUp = await this.prisma.followUp.create({
      data: {
        ownerId,
        customerId: followUp.customerId,
        ...data.nextFollowUp,
      },
      select: {
        id: true,
        type: true,
        status: true,
        scheduledAt: true,
      },
    });
    return {
      followUp: updatedFollowUp,
      nextFollowUp,
    };
  }

  async rescheduleFollowUp(
    ownerId: string,
    followUpId: string,
    data: RescheduleFollowUpDto,
  ) {
    const followUp = await this.prisma.followUp.findUnique({
      where: {
        id: followUpId,
        ownerId,
      },
    });

    if (!followUp) {
      throw new ForbiddenException(
        'You do not have permission to access this follow up.',
      );
    }

    if (followUp.status === 'DONE') {
      throw new ForbiddenException('You cannot update a completed follow up.');
    }

    const oldFollowUp = await this.prisma.followUp.update({
      where: {
        id: followUpId,
        ownerId,
      },
      data: { scheduledAt: data.scheduledAt, status: 'RESCHEDULED' },
      select: {
        id: true,
        status: true,
        scheduledAt: true,
      },
    });

    const nextFollowUp = await this.prisma.followUp.create({
      data: {
        ownerId,
        customerId: followUp.customerId,
        parentFollowUpId: followUpId,
        notes: data.notes,
        scheduledAt: data.scheduledAt,
      },
      select: {
        id: true,
        type: true,
        status: true,
        scheduledAt: true,
        parentFollowUpId: true,
        notes: true,
      },
    });

    return {
      oldFollowUp,
      nextFollowUp,
    };
  }
}
