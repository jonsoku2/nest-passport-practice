import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('Local auth guard canActivate before');
    const result = (await super.canActivate(context)) as boolean; // <-- local strategy 실행 트리거
    console.log('Local auth guard canActivate after');
    const request = context.switchToHttp().getRequest();
    console.log(request.session, 'Local auth guard before');
    console.log(request.isAuthenticated(), 'Local auth guard before');
    await super.logIn(request); // serializer 실행 트리거
    console.log(request.session, 'Local auth guard after');
    console.log(request.isAuthenticated(), 'Local auth guard after');
    return result;
  }
}
