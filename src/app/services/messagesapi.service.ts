import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Meessages } from '../modules/Messages';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesapiService extends ApiFunctionService<Meessages> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/messages", http);
  }

}
