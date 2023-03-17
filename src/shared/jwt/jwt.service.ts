import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    getSecret(): string {
        return this.configService.get<string>('JWT_SECRET');
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: {
                expiresIn: this.configService.get<number>('JWT_EXPIRES_IN'),
            },
        };
    }
}
