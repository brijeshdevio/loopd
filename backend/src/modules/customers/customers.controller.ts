import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { CustomersService } from './customers.service';
import {
  FindCustomersQueryDto,
  FindCustomersQuerySchema,
} from './dto/find-customers-query.dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findCustomers(
    @CurrentUser('id') userId: string,
    @Query(new ValidationPipe(FindCustomersQuerySchema))
    query: FindCustomersQueryDto,
  ) {
    const { customers, meta } = await this.customersService.findCustomers(
      userId,
      query,
    );
    return apiResponse({ data: customers, meta });
  }
}
