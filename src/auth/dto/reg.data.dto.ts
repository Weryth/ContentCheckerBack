import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class AuthUserDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(60)
    password: string
}