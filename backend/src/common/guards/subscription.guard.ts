import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request?.['user'] as unknown as {
      id: string;
      role: string;
    };

    const subscription = await this.prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!subscription) {
      throw new ForbiddenException({
        success: false,
        message: "You don't have a subscription.",
      });
    }

    const now = new Date();
    if (subscription.planType === 'FREE_TRIAL') {
      if (now > subscription.trialEndsAt) {
        throw new ForbiddenException({
          success: false,
          message: 'Your trial has expired.',
        });
      }
      return true;
    }

    if (
      subscription.status === 'EXPIRED' ||
      subscription.status === 'CANCELLED'
    ) {
      throw new ForbiddenException({
        success: false,
        message: 'Your plan has expired. Please renew to continue.',
      });
    }

    if (subscription.currentPeriodEnd && now > subscription.currentPeriodEnd) {
      await this.prisma.subscription.update({
        where: {
          userId: user.id,
        },
        data: {
          status: 'EXPIRED',
        },
      });
      throw new ForbiddenException({
        success: false,
        message: 'Your plan has expired. Please renew to continue.',
      });
    }

    return true;
  }
}
