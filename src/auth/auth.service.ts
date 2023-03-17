import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './contracts/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signup(createUserDto: CreateUserDto): Promise<void> {
        return this.usersRepository.createUser(createUserDto);
    }

    async signin(authCredentialDto: AuthCredentialsDto): Promise<object> {
        const { username, password } = authCredentialDto;
        const user = await this.usersRepository.findOneBy({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
