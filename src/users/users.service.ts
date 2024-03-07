import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    async findOne(userEmail: string){
        return this.prismaService.user.findFirst({where: {email: userEmail}})
    }

    
}
