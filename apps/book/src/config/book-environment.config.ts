import * as process from 'process';

export interface IEnvironmentConfig {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;
}

export class BookEnvironmentConfig implements IEnvironmentConfig {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;

  constructor() {
    this.port = Number(process.env.BOOK_PORT) || 3001;
    this.dbUrl = process.env.BOOK_DATABASE_URL;
    this.jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this.jwtAccessTokenDuration = process.env.JWT_ACCESS_TOKEN_DURATION;
  }
}

export const environmentConfig = new BookEnvironmentConfig();
