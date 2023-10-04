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

// TODO auth guard
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // TODO seul un admin peut voir tous les utilisateurs
  @Query(() => [User], { name: 'allUsers' })
  findAll() {
    return this.userService.findAll();
  }

  // TODO seul l'utilisateur peut voir son profil (ou un admin)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // TODO seul l'utilisateur peut modifier son profil (ou un admin)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  // TODO seul un admin peut supprimer un utilisateur
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
