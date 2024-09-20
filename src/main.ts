import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as MySQLStore from 'express-mysql-session';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setViewEngine("ejs");

  // Configuration de la session
  const sessionOptions = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Admin@123',
    database: 'back_nest',
  };

  app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  const MySQLStoreInstance = MySQLStore(session);
  const sessionStore = new MySQLStoreInstance(sessionOptions);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
    }),
  );

  await app.listen(3001);
}
bootstrap();
