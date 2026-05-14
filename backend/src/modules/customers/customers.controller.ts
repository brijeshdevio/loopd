import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { CustomersService } from './customers.service';
import {
  CreateCustomerDto,
  CreateCustomerSchema,
} from './dto/create-customer.dto';
import {
  FindCustomersQueryDto,
  FindCustomersQuerySchema,
} from './dto/find-customers-query.dto';
import {
  UpdateCustomerDto,
  UpdateCustomerSchema,
} from './dto/update-customer.dto';

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

  @Post()
  async createCustomer(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(CreateCustomerSchema))
    data: CreateCustomerDto,
  ) {
    const customer = await this.customersService.createCustomer(userId, data);
    return apiResponse({
      data: customer,
      message: 'Customer added successfully',
    });
  }

  @Patch(':id')
  async updateCustomer(
    @CurrentUser('id') userId: string,
    @Param('id') customerId: string,
    @Body(new ValidationPipe(UpdateCustomerSchema))
    data: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.updateCustomer(
      userId,
      customerId,
      data,
    );
    return apiResponse({
      data: customer,
      message: 'Customer updated successfully',
    });
  }

  @Get(':id')
  async findCustomerById(
    @CurrentUser('id') userId: string,
    @Param('id') customerId: string,
  ) {
    const customer = await this.customersService.findCustomerById(
      userId,
      customerId,
    );
    return apiResponse({
      data: customer,
    });
  }

  @Delete(':id')
  async deleteCustomer(
    @CurrentUser('id') userId: string,
    @Param('id') customerId: string,
  ) {
    await this.customersService.deleteCustomer(userId, customerId);
    return apiResponse({
      message: 'Customer deleted successfully',
    });
  }

  @Patch(':id/restore')
  async restoreCustomer(
    @CurrentUser('id') userId: string,
    @Param('id') customerId: string,
  ) {
    const customer = await this.customersService.restoreCustomer(
      userId,
      customerId,
    );
    return apiResponse({
      message: 'Customer restored successfully',
      data: customer,
    });
  }
}
