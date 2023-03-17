import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        return this.usersRepository.createUser(createUserDto);
    }

    async signin(authCredentialDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialDto;
        const user = await this.usersRepository.findOneBy({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            return 'success';
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
