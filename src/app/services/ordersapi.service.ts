import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Order } from '../modules/order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersapiService {
  baseUrl = 'https://mogarealstate.runasp.net/api'
  constructor(private http: HttpClient) {
  }
  getOrders(agentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Agents/Orders/${agentId}`);
  }
  changeStatues(orderId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Agents/ChangeOrderStatus/${orderId}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  addOrder(userId: number, propertyId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Users/OrderProperty/${userId}/${propertyId}`, null);
  }
}
