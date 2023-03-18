import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './schema/config.schema';

const envFilePath: string = getEnvPath();

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
            validationSchema: configValidationSchema,
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        TasksModule,
        AuthModule,
    ],
})
export class AppModule {}
