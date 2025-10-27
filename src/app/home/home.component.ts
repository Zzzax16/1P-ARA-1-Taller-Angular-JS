import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: any = null; // 👈 propiedad faltante

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    // Si tienes token, muestra el usuario demo
    if (this.userService.getToken()) {
      this.userService.getUserDemo().subscribe({
        next: (res) => {
          this.user = res.data; // 👈 guardamos la info del usuario
        },
        error: (err) => {
          console.error('Error al obtener usuario', err);
        }
      });
    }
  }
}