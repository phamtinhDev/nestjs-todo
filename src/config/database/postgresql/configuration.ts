import { registerAs } from '@nestjs/config';

export default registerAs('postgre', () => ({
  host: process.env.POSTGRE_HOST,
  port: process.env.POSTGRE_PORT,
  user: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASS,
  database: process.env.POSTGRE_DB,
}));
