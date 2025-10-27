import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirm = '';
  message = '';

  constructor(private userService: UsersService, private router: Router) {}

  register() {
    if (this.password !== this.confirm) {
      this.message = 'Las contraseñas no coinciden';
      return;
    }

    this.userService.register({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Registro exitoso. Ahora puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => (this.message = err.message)
    });
  }
}