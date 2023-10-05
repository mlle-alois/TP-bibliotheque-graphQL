import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { environmentConfig } from './config/book-environment.config';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: environmentConfig.jwtAccessSecret,
      signOptions: { expiresIn: environmentConfig.jwtAccessTokenDuration },
    }),
  ],
  providers: [],
  exports: [JwtModule],
})
export class CoreModule {}
