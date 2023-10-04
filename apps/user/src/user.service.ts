import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const user = new User();
    user.id = id;
    if (updateUserInput.firstname != null) {
      user.firstname = updateUserInput.firstname;
    }
    if (updateUserInput.lastname != null) {
      user.lastname = updateUserInput.lastname;
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = new User();
    user.id = id;
    return await this.userRepository.remove(user);
  }
}
