import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
    constructor(private readonly configService: ConfigService) {}

    getJwtConfig() {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
            },
        };
    }
}
