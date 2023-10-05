import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { environmentConfig } from '../config/user-environment.config';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken());
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfig.jwtAccessSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
