import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Admin@123',
      database: 'back_nest',
      entities: [Product, User],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    ServeStaticModule.forRoot({
      rootPath: '/var/www/back_nest/uploads', // Chemin vers le répertoire des fichiers
      serveRoot: '/images', // Cela servira les fichiers depuis '/images'
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
