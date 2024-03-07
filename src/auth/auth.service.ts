import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUserDTO } from './dto/reg.data.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService
    ) {}

  async RegisterNewUserService(regData: AuthUserDTO) {
    const hashedPass = await this.cryptUserPasswordService(regData.password);
    try {
      return await this.prismaService.user.create({
        data: {
          email: regData.email,
          password: hashedPass,
        },
        select: {
          password: false,
          id: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async UserLoginService(data: AuthUserDTO){
    const user = await this.userService.findOne(data.email)
    if (user) {
        return await this.decryptUserPsswordService(data.password, user.password)
    } else {
        throw new HttpException('user is not exist', HttpStatus.NOT_FOUND)
    }
  }

  async cryptUserPasswordService(pass: string) {
    const salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(pass, salt);
  }

  async decryptUserPsswordService(pass: string, hash: string) {
    return bcrypt.compareSync(pass, hash);
  }
}
