import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { apiResponse } from 'src/common/helper/api-response';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

import { AuthService } from './auth.service';
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
}
