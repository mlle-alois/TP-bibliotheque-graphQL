import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuthGuard } from './guards/graphql-auth-guard.service';

@UseGuards(GraphQLAuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'allUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => String)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    await this.userService.remove(id);
    return 'User deleted';
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<User> {
    return this.userService.findOne(reference.id);
  }
}
