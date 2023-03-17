import {
    IsEmail,
    IsString,
    IsStrongPassword,
    Length,
    MinLength,
} from 'class-validator';
export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(4, 20)
    username: string;

    @IsString()
    @MinLength(8)
    @IsStrongPassword()
    password: string;
}
