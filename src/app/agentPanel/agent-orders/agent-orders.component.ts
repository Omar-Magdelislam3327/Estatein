import { Component } from '@angular/core';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { CommonModule } from '@angular/common';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrdersapiService } from '../../services/ordersapi.service';

@Component({
  selector: 'app-agent-orders',
  standalone: true,
  imports: [
    AgentNavComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './agent-orders.component.html',
  styleUrl: './agent-orders.component.css',
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
export class AgentOrdersComponent {
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
