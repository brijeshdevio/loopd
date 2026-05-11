import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { type Response } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { apiResponse } from 'src/common/helper/api-response';
import { clearCookie, setCookie } from 'src/common/helper/cookie';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { AuthService } from './auth.service';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { RegisterDto, RegisterSchema } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe(RegisterSchema))
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data);
    return apiResponse({ message: 'User registered successfully', data: user });
  }

  @Post('login')
  @UsePipes(new ValidationPipe(LoginSchema))
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(data);
    setCookie(res, 'accessToken', accessToken);
    return apiResponse({ message: 'User logged in successfully' });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    clearCookie(res, 'accessToken');
    return apiResponse({ message: 'User logged out successfully.' });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async findUserById(@CurrentUser('id') userId: string) {
    const user = await this.authService.findUserById(userId);
    return apiResponse({ data: user });
  }
}
