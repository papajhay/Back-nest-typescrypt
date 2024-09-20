import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const filename = `${Date.now()}${extname(file.originalname)}`;
                    callback(null, filename);
                },
            }),
        };
    }
}
