import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const canActivateContext = GqlExecutionContext.create(context);
    return canActivateContext.getContext().req;
  }
}
