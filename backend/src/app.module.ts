import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { FollowUpsModule } from './modules/follow-ups/follow-ups.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, CustomersModule, FollowUpsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
