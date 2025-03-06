import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersapiService {
  private baseUrl = 'https://mogarealstate.runasp.net';
  constructor(private http: HttpClient) { }
  post(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Auth/Register`, user);
  }

  getUserData(userId: any) {
    return this.http.get<any>(`${this.baseUrl}/api/Users/UserData/${userId}`);
  }
}
