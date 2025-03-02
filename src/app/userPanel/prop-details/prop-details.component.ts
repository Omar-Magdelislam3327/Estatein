import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { UsersapiService } from '../../services/usersapi.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Properties } from './../../modules/Properties';
import { User } from './../../modules/User';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { OrdersapiService } from '../../services/ordersapi.service';
import { Order } from '../../modules/order';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-prop-details',
  standalone: true,
  imports: [NavComponent, FooterComponent, CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './prop-details.component.html',
  styleUrls: ['./prop-details.component.css'],
  providers: [MessageService],
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
  prop !: any;
  userId!: any;
  isFavorite!: boolean;
  //
  changesForm!: FormGroup;
  constructor(
    private api: PropertiesapiService,
    private activ: ActivatedRoute,
    private fb: FormBuilder,
    private orderAPI: OrdersapiService,
    private messageService: MessageService
  ) {
    this.activ.paramMap.subscribe(params => {
      this.id = Number(params.get("id"));
      this.api.getPropertyById(this.id).subscribe((data: any) => {
        this.prop = data;
        console.log(this.prop);
      });
    });
    this.userId = localStorage.getItem('userId');
    this.isFav();
  }
  ngOnInit() {
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
    if (!this.isUserLoggedIn()) {
      this.showLoginAlert();
      return;
    }
    this.api.addPropertyToFavorites(this.userId, this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Added to favorites!',
            life: 2000
          }
        );
        this.isFav();
      },
      error: (error) => {
        console.log(error);
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: 'The Property is already in your favorites!',
            life: 2000
          });
      }
    });
  }
  isFav() {
    this.api.isFavorite(this.userId, this.id).subscribe({
      next: (data: any) => {
        this.isFavorite = data;
        console.log('Fav:', this.isFavorite)
      }, error: (error) => {
        console.log(error);
        console.log('err:', this.isFavorite)
      }
    })
  }
  orderProperty() {
    if (!this.isUserLoggedIn()) {
      this.showLoginAlert();
      return;
    }
    this.orderAPI.addOrder(this.userId, this.id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.messageService.add(
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Appointment made successfully!',
            life: 2000
          });

      }, error: (error) => {
        console.log(error);
        this.messageService.add(
          {
            severity: 'error',
            summary: 'Error',
            detail: 'You already have an appointment for this property!',
            life: 2000
          });

      }
    })
  }
  isUserLoggedIn(): boolean {
    const user = localStorage.getItem('userId');
    return user !== null;
  }
  showLoginAlert() {
    Swal.fire({
      title: 'Login Required',
      text: 'You need to log in to perform this action.',
      icon: 'warning',
      background: '#1e1e1e',
      color: 'white',
      confirmButtonColor: '#A70A9A',
      confirmButtonText: 'Login',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  }
}
