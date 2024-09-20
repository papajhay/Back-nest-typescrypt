import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Répertoire où les fichiers seront stockés
        filename: (req, file, callback) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
    TypeOrmModule.forFeature([Product])
  ],
  // imports: [TypeOrmModule.forFeature([Product]), MulterModule.register(multerOptions)],
  providers: [ProductsService],
  controllers: [ProductsController],
})

export class ProductsModule { }

