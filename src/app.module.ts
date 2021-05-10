import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AppConfigModule } from './config/app/config.module';
import { PostgreModule } from './providers/database/postgresql/provider.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './authentication/auth.module';
import { AuthService } from './authentication/auth.service';
import { LocalAuthGuard } from './authentication/guards/local-auth.guard';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';

@Module({
  imports: [AppConfigModule, PostgreModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalAuthGuard, JwtAuthGuard],
})
export class AppModule {}
