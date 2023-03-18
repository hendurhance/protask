import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
    STAGE: Joi.string().required().valid('development', 'production'),
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().default(5432).required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.number().default(3600).required(),
});
