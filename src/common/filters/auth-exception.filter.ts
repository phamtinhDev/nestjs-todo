import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    if (status === HttpStatus.UNAUTHORIZED && message === 'login-error') {
      request.flash('error', 'Tài khoản hoặc mật khẩu không đúng!');
      return response.redirect('/login');
    }

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      return response.redirect('/401');
    }

    if (status === HttpStatus.NOT_FOUND) {
      return response.redirect('/404');
    }

    request.flash('error', message);
    return response.redirect(request.url);
  }
}
