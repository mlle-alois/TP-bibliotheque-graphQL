import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { environmentConfig } from '../config/user-environment.config';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfig.jwtAccessSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findOneBy({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
