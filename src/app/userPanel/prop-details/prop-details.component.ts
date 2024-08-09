import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { UsersapiService } from '../../services/usersapi.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Properties } from './../../modules/Properties';
import { User } from './../../modules/User';
import { NgIf , NgFor } from '@angular/common';
import { OrdersapiService } from '../../services/ordersapi.service';
import { Order } from '../../modules/order';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-prop-details',
  standalone: true,
  imports: [NavComponent, FooterComponent , NgIf , NgFor , RouterLink],
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],
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
export class PropDetailsComponent {
  id!: any;
  prop = new Properties();
  user: User | null = null;

  constructor(
    private api: PropertiesapiService,
    private activ: ActivatedRoute,
    private userApi: UsersapiService,
    private orderApi : OrdersapiService
  ) {
    this.id = this.activ.snapshot.params["id"];
    this.api.getById(this.id).subscribe((data: any) => {
      this.prop = data;
    });
    const userId = this.getUserId();
    if (userId) {
      this.userApi.getById(userId).subscribe((user: User) => {
        this.user = user;
      });
    }
  }
  ngOnInit(){
    window.scrollTo(0, 0);
  }
  getUserId(): number | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userId = JSON.parse(userString).id;
      return userId;
    }
    return null;
  }

  addToFav() {
    if (this.user && !this.user.favorites.includes(this.prop.id)) {
      this.user.favorites.push(this.prop.id);
      this.userApi.put(this.user.id, this.user).subscribe(() => {
        alert('Property added to favorites');
      });
    }
  }
  orderProperty() {
    if (this.user && this.prop) {
      const order = new Order();
      order.userEmail = this.user.email;
      order.userName = this.user.name;
      order.propertyId = this.prop.id;
      order.propertyName = this.prop.name;
      order.date = new Date();
      order.status = 'Pending';
      this.orderApi.post(order).subscribe(() => {
        alert('Order placed successfully!');
      });
    }
  }
}
