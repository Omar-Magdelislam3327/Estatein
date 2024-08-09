import { Component } from '@angular/core';
import { AdminNavComponent } from '../../userPanel/shared/admin-nav/admin-nav.component';
import { OrdersapiService } from '../../services/ordersapi.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
export class  OrderComponent {
  orders!:any;
  constructor(private api : OrdersapiService , private router : Router) {
    let loggedIn = JSON.parse(localStorage.getItem("admin") || "false");
    if (!loggedIn) {
      this.router.navigateByUrl('/home');
    }
    this.api.get().subscribe((data:any)=>{
      this.orders = data;
      console.log(data);
    })
  }
}
