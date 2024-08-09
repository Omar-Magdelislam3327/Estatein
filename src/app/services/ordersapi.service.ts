import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Order } from '../modules/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersapiService extends ApiFunctionService<Order> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/orders", http);
  }
}
