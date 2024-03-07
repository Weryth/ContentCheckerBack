import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserDTO } from './dto/reg.data.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('reg')
  async RegisterNewUser(@Body() data: AuthUserDTO) {
    return await this.authService.RegisterNewUserService(data);
  }

  @Post('login')
  async UserLogin(@Body() data: AuthUserDTO) {
    return await this.authService.UserLoginService(data);
  }
}
