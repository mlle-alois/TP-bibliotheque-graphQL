import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './guards/graphql-auth-guard.service';

@UseGuards(GraphQLAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly bookService: BookService) {}

  @ResolveField(() => [Book])
  books(@Parent() user: User) {
    return this.bookService.findAllByAuthorId(user.id);
  }
}
