import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUserDTO } from './dto/reg.data.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/customDecorators/public.decorator';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('reg')
  async RegisterNewUser(@Body() data: AuthUserDTO) {
    return await this.authService.RegisterNewUserService(data);
  }

  @Public()
  @Post('login')
  async UserLogin(@Body() data: AuthUserDTO) {
    return await this.authService.UserLoginService(data);
  }

  @Get()
  async Test(@CurrentUser() jwtPayload: JwtPayload){
    return jwtPayload
  }
}
