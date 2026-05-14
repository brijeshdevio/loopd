import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import {
  FindFollowUpsQueryDto,
  FindFollowUpsQuerySchema,
} from './dto/find-follow-up-query.dto';
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
}
