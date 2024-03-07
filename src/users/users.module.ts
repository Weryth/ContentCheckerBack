import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  imports:[PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}
