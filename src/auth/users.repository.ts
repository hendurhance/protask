import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostgresErrorCode } from '../utils/postgres-error-code.utils';
@Injectable()
export class UsersRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(createUserDto: CreateUserDto): Promise<void> {
        const { name, email, username, password } = createUserDto;
        const user = this.create({
            name,
            email,
            username,
            password,
        });
        try {
            await this.save(user);
        } catch (error) {
            if (error.code === PostgresErrorCode.UniqueViolation) {
                throw new ConflictException('Username or email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}
