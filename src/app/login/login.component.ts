import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(private userService: UsersService, private router: Router) {}

  login() {
    this.userService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.userService.setToken(res.token);
        this.router.navigate(['/']);
      },
      error: () => (this.message = 'Error en login')
    });
  }
}