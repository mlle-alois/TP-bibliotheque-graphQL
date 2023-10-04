import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail } from 'class-validator';

@Entity()
@Directive('@key(fields: "id")')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: number;

  @Column({ nullable: false })
  @Field()
  firstname: string;

  @Column({ nullable: false })
  @Field()
  lastname: string;

  @Column({ nullable: false, unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;
}
