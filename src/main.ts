import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('PORT');

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port, () => {
        console.log(
            `[Nest] Application running on ${config.get<string>('BASE_URL')}`,
        );
    });
}
bootstrap();
