import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';

interface User {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersKey = 'users';
  private tokenKey = 'token';

  constructor(private cookies: CookieService) {}

  // 🔐 LOGIN LOCAL
  login(payload: { email: string; password: string }): Observable<any> {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === payload.email && u.password === payload.password);

    if (user) {
      this.setToken('fake-token-123');
      return of({ token: 'fake-token-123', user });
    } else {
      return throwError(() => new Error('Credenciales incorrectas'));
    }
  }

  // 🧾 REGISTRO LOCAL
  register(payload: { email: string; password: string }): Observable<any> {
    const users = this.getAllUsers();
    const exists = users.find(u => u.email === payload.email);

    if (exists) {
      return throwError(() => new Error('El usuario ya existe'));
    }

    const newUser: User = {
      email: payload.email,
      password: payload.password,
      first_name: 'Nuevo',
      last_name: 'Usuario',
      avatar: 'assets/img/logo.jpg'
    };

    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return of({ message: 'Usuario registrado correctamente', user: newUser });
  }

  // 🧰 MÉTODOS DE APOYO
  private getAllUsers(): User[] {
    const data = localStorage.getItem(this.usersKey);
    return data ? JSON.parse(data) : [];
  }

  setToken(token: string) {
    this.cookies.set(this.tokenKey, token);
  }

  getToken(): string {
    return this.cookies.get(this.tokenKey);
  }

  deleteToken() {
    this.cookies.delete(this.tokenKey);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout() {
    this.deleteToken();
  }

  getUserDemo(): Observable<any> {
    const users = this.getAllUsers();
    const user = users[0] || {
      first_name: 'Admin',
      last_name: 'Demo',
      email: 'admin@example.com',
      avatar: 'assets/img/logo.jpg'
    };
    return of({ data: user });
  }
}