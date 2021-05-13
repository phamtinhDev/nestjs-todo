import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe());

  const appConfig: AppConfigService = app.get('AppConfigService');

  app.useGlobalFilters(new AuthExceptionFilter());

  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(appConfig.port);
}
bootstrap();
