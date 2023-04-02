import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './transformers/transform.interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger();

    const app: NestExpressApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('PORT');

    // Enable CORS - Cross Origin Resource Sharing
    app.enableCors();

    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalPipes(new ValidationPipe());

    // Swagger documentation
    const swaggerConfig = new DocumentBuilder()
        .setTitle('ProTask API')
        .setDescription('ProTask is a lightweight RestAPI for task management')
        .setVersion('1.0')
        .addTag('task')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(port, () => {
        logger.log(`Application running on ${config.get<string>('BASE_URL')}`);
    });
}
bootstrap();
