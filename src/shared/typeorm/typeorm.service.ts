import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    @Inject(ConfigService)
    private readonly config: ConfigService;

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.config.get<string>('DATABASE_HOST'),
            port: this.config.get<number>('DATABASE_PORT'),
            username: this.config.get<string>('DATABASE_USERNAME'),
            password: this.config.get<string>('DATABASE_PASSWORD'),
            database: this.config.get<string>('DATABASE_NAME'),
            migrations: ['dist/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            autoLoadEntities: true,
            logger: 'file',
            synchronize: true, // NOTE: This should be false in production
        };
    }
}
