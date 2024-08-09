import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/User';
import { ApiFunctionService } from './api-function.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersapiService extends ApiFunctionService<User> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/user", http);
  }
}
