import { Component } from '@angular/core';
import { AdminNavComponent } from '../../userPanel/shared/admin-nav/admin-nav.component';
import { OrdersapiService } from '../../services/ordersapi.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    AdminNavComponent,
    NgFor
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class OrderComponent {
  orders!: any;
  agentId: number;
  changesForm!: FormGroup;
  constructor(private propAPI: PropertiesapiService, private fb: FormBuilder, private orderAPI: OrdersapiService) {
    this.agentId = parseInt(localStorage.getItem('agentId')!);
    this.changesForm = this.fb.group({
      newStatus: ['']
    });

  }
  ngOnInit(): void {
    this.orderAPI.getOrders(this.agentId).subscribe(orders => {
      this.orders = orders;
      console.log(this.orders);
    })
  }
  changeStatus(orderId: number, status: string): void {
    const body = { newStatus: status };

    this.orderAPI.changeStatues(orderId, body).subscribe(
      (response) => {
        console.log('Status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }

}
