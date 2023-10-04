import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field()
  title: string;

  @Column({ nullable: false })
  @Field()
  nbPages: number;

  @Column({ nullable: false })
  @Field()
  year: number;

  @Column({ nullable: false })
  @Field()
  authorId: number;

  @Field(() => User)
  author?: User;
}
