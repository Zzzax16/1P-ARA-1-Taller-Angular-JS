import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.userService.getToken();
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}