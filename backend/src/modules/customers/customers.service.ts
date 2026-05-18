import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PRISMA_CODES } from 'src/constants/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomersQueryDto } from './dto/find-customers-query.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

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

  async createCustomer(ownerId: string, data: CreateCustomerDto) {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        userId: ownerId,
      },
    });
    if (
      subscription?.planType === 'FREE_TRIAL' ||
      subscription?.planType === 'STANDARD'
    ) {
      {
        const count = await this.prisma.customer.count({ where: { ownerId } });
        if (count >= 200) {
          throw new ForbiddenException({
            success: false,
            message:
              'You have reached the limit of 200 customers. Please upgrade to Pro for unlimited customers.',
          });
        }
      }
    }

    try {
      const customer = await this.prisma.customer.create({
        data: {
          ownerId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          lastVisitDate: data.lastVisitDate,
          notes: data.notes,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          lastVisitDate: true,
          createdAt: true,
        },
      });
      if (data.followUp) {
        await this.prisma.followUp.create({
          data: {
            ownerId,
            customerId: customer.id,
            scheduledAt: data.followUp.scheduledAt,
            type: data.followUp.type,
          },
        });
      }

      return customer;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(`Phone number already exists.`);
        }
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new UnauthorizedException(
            'You are not logged in or your session has expired. Please log in again.',
          );
        }
      }
      throw error;
    }
  }

  async updateCustomer(
    ownerId: string,
    customerId: string,
    data: UpdateCustomerDto,
  ) {
    try {
      return await this.prisma.customer.update({
        where: {
          id: customerId,
          ownerId,
        },
        data: {
          ownerId,
          name: data.name,
          phone: data.phone,
          email: data.email,
          lastVisitDate: data.lastVisitDate,
          notes: data.notes,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          lastVisitDate: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(`Phone number already exists.`);
        }
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new UnauthorizedException(
            'You are not logged in or your session has expired. Please log in again.',
          );
        }
      }
      throw error;
    }
  }

  async findCustomerById(ownerId: string, customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
        ownerId,
      },
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
          select: {
            id: true,
            scheduledAt: true,
            status: true,
            type: true,
            priority: true,
            completedAt: true,
            outcomeNotes: true,
            createdAt: true,
          },
        },
      },
    });

    if (!customer) {
      throw new ForbiddenException(
        'You do not have permission to access this customer.',
      );
    }

    return customer;
  }

  async deleteCustomer(ownerId: string, customerId: string) {
    try {
      await this.prisma.customer.update({
        where: {
          id: customerId,
          ownerId,
        },
        data: {
          deletedAt: new Date(),
          isDeleted: true,
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

  async restoreCustomer(ownerId: string, customerId: string) {
    try {
      return await this.prisma.customer.update({
        where: {
          id: customerId,
          ownerId,
          isDeleted: true,
        },
        data: {
          deletedAt: null,
          isDeleted: false,
        },
        select: {
          id: true,
          name: true,
          isDeleted: true,
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
}
