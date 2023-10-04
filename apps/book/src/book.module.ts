import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { environmentConfig } from './config/book-environment.config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {UserResolver} from "./user.resolver";

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
    TypeOrmModule.forFeature([Book]),
  ],
  providers: [BookResolver, BookService, UserResolver],
})
export class BookModule {}
