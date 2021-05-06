import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgreConfigModule } from '../../../config/database/postgresql/config.module';
import { PostgreConfigService } from '../../../config/database/postgresql/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgreConfigModule],
      inject: [PostgreConfigService],
      useFactory: async (postgreConfig: PostgreConfigService) => ({
        type: 'postgres',
        host: postgreConfig.host,
        port: postgreConfig.port,
        username: postgreConfig.user,
        password: postgreConfig.password,
        database: postgreConfig.database,
        entities: [],
        synchronize: true,
      }),
    }),
  ],
})
export class PostgreModule {}
