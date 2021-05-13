import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

import { ValidationPipe } from './common/validations/validationRegister.pipe';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';
import { AuthExceptionFilter } from './common/filters/auth-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const appConfig: AppConfigService = app.get('AppConfigService');

  app.useGlobalPipes(new ValidationPipe());

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
  app.use(flash());

  await app.listen(appConfig.port);
}
bootstrap();
