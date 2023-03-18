import { existsSync } from 'fs';
import { resolve } from 'path';
import { Logger } from '@nestjs/common';

export function getEnvPath(): string {
    const env: string | undefined = `.env.${process.env.STAGE}`;
    const fallback: string = resolve('.env');
    const filename: string = env ? env : fallback;
    let filePath: string = resolve(filename);

    if (!existsSync(filePath)) {
        Logger.warn(`File ${filePath} not found. Using fallback ${fallback}`);
        filePath = fallback;
    }

    return filePath;
}
