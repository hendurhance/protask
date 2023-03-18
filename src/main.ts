import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './transformers/transform.interceptors';

async function bootstrap() {
    const logger = new Logger();

    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('PORT');

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port, () => {
        logger.log(`Application running on ${config.get<string>('BASE_URL')}`);
    });
}
bootstrap();
