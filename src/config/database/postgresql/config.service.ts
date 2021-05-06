import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgreConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('postgre.host');
  }

  get port(): number {
    return this.configService.get<number>('postgre.port');
  }

  get user(): string {
    return this.configService.get<string>('postgre.user');
  }

  get password(): string {
    return this.configService.get<string>('postgre.password');
  }

  get database(): string {
    return this.configService.get<string>('postgre.database');
  }
}
