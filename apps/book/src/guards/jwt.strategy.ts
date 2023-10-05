import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { environmentConfig } from '../config/book-environment.config';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private graphqlClient: GraphQLClient;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfig.jwtAccessSecret,
    });
    this.graphqlClient = new GraphQLClient('http://127.0.0.1:3000/graphql');
  }

  async validate(payload: JwtPayload) {
    const query = `
        query {
          user(id: ${payload.userId}) {
            id
          }
        }
        `;
    const data = await this.graphqlClient.request(query);
    const user = data['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
