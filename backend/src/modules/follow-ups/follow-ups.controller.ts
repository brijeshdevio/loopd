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

import {
  CreateFollowUpDto,
  CreateFollowUpSchema,
} from './dto/create-follow-up.dto';
import { DoneFollowUpDto, DoneFollowUpSchema } from './dto/done-follow-up.dto';
import {
  FindFollowUpsQueryDto,
  FindFollowUpsQuerySchema,
} from './dto/find-follow-up-query.dto';
import {
  NoResponseFollowUpDto,
  NoResponseFollowUpSchema,
} from './dto/no-response-follow-up.dto';
import {
  RescheduleFollowUpDto,
  RescheduleFollowUpSchema,
} from './dto/reschedule-follow-up.dto';
import {
  UpdateFollowUpDto,
  UpdateFollowUpSchema,
} from './dto/update-follow-up.dto';
import { FollowUpsService } from './follow-ups.service';

@Controller('follow-ups')
@UseGuards(JwtAuthGuard)
export class FollowUpsController {
  constructor(private readonly followUpsService: FollowUpsService) {}

  @Get()
  async findFollowUps(
    @CurrentUser('id') ownerId: string,
    @Query(new ValidationPipe(FindFollowUpsQuerySchema))
    query: FindFollowUpsQueryDto,
  ) {
    const { followUps, meta } = await this.followUpsService.findFollowUps(
      ownerId,
      query,
    );
    return apiResponse({ data: followUps, meta });
  }

  @Get(':id')
  async findFollowUpById(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
  ) {
    const followUp = await this.followUpsService.findFollowUpById(
      ownerId,
      followUpId,
    );
    return apiResponse({ data: followUp });
  }

  @Post()
  async createFollowUp(
    @CurrentUser('id') ownerId: string,
    @Body(new ValidationPipe(CreateFollowUpSchema)) data: CreateFollowUpDto,
  ) {
    const followUp = await this.followUpsService.createFollowUp(ownerId, data);
    return apiResponse({
      data: followUp,
      message: 'Follow-up added successfully',
    });
  }

  @Patch(':id')
  async updateFollowUp(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
    @Body(new ValidationPipe(UpdateFollowUpSchema)) data: UpdateFollowUpDto,
  ) {
    const followUp = await this.followUpsService.updateFollowUp(
      ownerId,
      followUpId,
      data,
    );
    return apiResponse({
      data: followUp,
      message: 'Follow-up updated successfully',
    });
  }

  @Patch(':id/done')
  async doneFollowUp(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
    @Body(new ValidationPipe(DoneFollowUpSchema)) data: DoneFollowUpDto,
  ) {
    const { followUp, nextFollowUp } = await this.followUpsService.doneFollowUp(
      ownerId,
      followUpId,
      data,
    );
    return apiResponse({
      data: { followUp, nextFollowUp },
      message: 'Follow-up done successfully',
    });
  }

  @Patch(':id/reschedule')
  async rescheduleFollowUp(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
    @Body(new ValidationPipe(RescheduleFollowUpSchema))
    data: RescheduleFollowUpDto,
  ) {
    const { oldFollowUp, nextFollowUp } =
      await this.followUpsService.rescheduleFollowUp(ownerId, followUpId, data);
    return apiResponse({
      data: { oldFollowUp, nextFollowUp },
      message: 'Follow-up rescheduled successfully',
    });
  }

  @Patch(':id/no-response')
  async noResponseFollowUp(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
    @Body(new ValidationPipe(NoResponseFollowUpSchema))
    data: NoResponseFollowUpDto,
  ) {
    const followUp = await this.followUpsService.noResponseFollowUp(
      ownerId,
      followUpId,
      data,
    );
    return apiResponse({
      data: followUp,
      message: 'Follow-up marked as no response successfully',
    });
  }

  @Delete(':id')
  async deleteFollowUp(
    @CurrentUser('id') ownerId: string,
    @Param('id') followUpId: string,
  ) {
    await this.followUpsService.deleteFollowUp(ownerId, followUpId);
    return apiResponse({ message: 'Follow-up deleted successfully' });
  }
}
