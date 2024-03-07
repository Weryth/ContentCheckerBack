import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthUserDTO } from './dto/reg.data.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/customDecorators/public.decorator';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { Response, Request } from 'express';

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
  async UserLogin(@Body() data: AuthUserDTO, @Res() res: Response) {
    const tokens = await this.authService.UserLoginService(data);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.send({ acessToken: tokens.accessToken });
  }

  @Public()
  @Get('refreshToken')
  async GetAcessTokens(@Res() res: Response, @Req() request: Request) {
    const tokens = await this.authService.RefreshTokens(
      request.cookies['refreshToken'],
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.send({ acessToken: tokens.accessToken });
  }

  @Get('exit')
  async ExitFromAccount(@Res() res: Response, @Req() request: Request, @CurrentUser() jwtPayload: JwtPayload) {
    await this.authService.RefreshTokens(request.cookies['refreshToken']);
    res.clearCookie('refreshToken')
    res.send("OK")
  }

  @Get()
  async Test(@CurrentUser() jwtPayload: JwtPayload) {
    return jwtPayload;
  }
}
