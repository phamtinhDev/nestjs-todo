import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from './configuration';
import { PostgreConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        POSTGRE_HOST: Joi.string().default('localhost'),
        POSTGRE_PORT: Joi.number().default(5432),
        POSTGRE_USER: Joi.string().default('admin'),
        POSTGRE_PASS: Joi.string().default('pxt@4321'),
        POSTGRE_DB: Joi.string().default('demo-db'),
      }),
    }),
  ],
  providers: [ConfigService, PostgreConfigService],
  exports: [ConfigService, PostgreConfigService],
})
export class PostgreConfigModule {}
