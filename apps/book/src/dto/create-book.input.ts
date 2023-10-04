import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field()
  nbPages: number;

  @Field()
  year: number;

  @Field()
  authorId: number;
}
