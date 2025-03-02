import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface LoginResponse {
  userId: any;
  agentId: any;
  userName: string;
  email: string;
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://mogarealstate.runasp.net/Auth/Login';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl, { email, password });
  }

  saveUserData(user: LoginResponse): void {
    if (user.role === 'Admin') {
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', user.token);
      localStorage.setItem('role', user.role);
    } else if (user.role === 'Agent') {
      localStorage.setItem('agentId', user.agentId);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', user.token);
      localStorage.setItem('role', user.role);
    } else {
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userName', user.userName);
      localStorage.setItem('token', user.token);
      localStorage.setItem('role', user.role);
    }

  }


  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  redirectToDashboard(): void {
    const role = localStorage.getItem('role');

    if (role === 'User') {
      this.router.navigate(['/home']);
    } else if (role === 'Agent') {
      this.router.navigate(['/agent/dashboard']);
    } else if (role === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      console.error('No role found, redirection failed');
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
