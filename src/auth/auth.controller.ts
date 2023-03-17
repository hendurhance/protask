import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

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
}
