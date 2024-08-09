import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null || localStorage.getItem('agent') !== null || localStorage.getItem('admin') !== null;
  }

  getRole(): string | null {
    if (localStorage.getItem('user')) {
      return 'user';
    } else if (localStorage.getItem('agent')) {
      return 'agent';
    } else if (localStorage.getItem('admin')) {
      return 'admin';
    }
    return null;
  }

  redirectToHome(): void {
    const role = this.getRole();
    if (role === 'user') {
      this.router.navigate(['/home']);
    } else if (role === 'agent') {
      this.router.navigate(['/agent/dashboard']);
    } else if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
