import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(public userService: UsersService, private router: Router) {}

  logout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}