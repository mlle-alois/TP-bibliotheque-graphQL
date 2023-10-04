import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from './book.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => [Book])
  books?: Book[];
}
