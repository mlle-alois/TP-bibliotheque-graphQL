import * as process from 'process';

export interface IEnvironmentConfig {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;
}

export class UserEnvironmentConfig implements IEnvironmentConfig {
  port: number;
  dbUrl: string;
  jwtAccessSecret: string;
  jwtAccessTokenDuration: string;

  constructor() {
    this.port = Number(process.env.USER_PORT) || 3000;
    this.dbUrl = process.env.USER_DATABASE_URL;
    this.jwtAccessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
    this.jwtAccessTokenDuration = process.env.JWT_ACCESS_TOKEN_DURATION;
  }
}

export const environmentConfig = new UserEnvironmentConfig();
