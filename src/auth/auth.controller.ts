import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    /**
     * @description Sign up a new user
     * @param createUserDto
     * @returns {Promise<void>}
     */
    @Post('/signup')
    async signup(
        @Body()
        createUserDto: CreateUserDto,
    ): Promise<void> {
        return this.authService.signup(createUserDto);
    }

    /**
     * @description Sign in a new user
     * @param AuthCredentialsDto
     * @returns {Promise<string>}
     */
    @Post('/signin')
    async signin(
        @Body()
        authCredentialsDto: AuthCredentialsDto,
    ): Promise<string> {
        return this.authService.signin(authCredentialsDto);
    }
}
