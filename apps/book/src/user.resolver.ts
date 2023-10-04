import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly bookService: BookService) {}

  @ResolveField(() => [Book])
  books(@Parent() user: User) {
    return this.bookService.findAllByAuthorId(user.id);
  }
}
