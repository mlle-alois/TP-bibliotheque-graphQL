import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environmentConfig } from './config/user-environment.config';
import { User } from './entities/user.entity';
import { JwtStrategy } from './guards/jwt.strategy';
import { CoreModule } from './core.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: environmentConfig.dbUrl,
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User]),
    CoreModule,
  ],
  providers: [UserResolver, UserService, JwtStrategy],
})
export class UserModule {}
