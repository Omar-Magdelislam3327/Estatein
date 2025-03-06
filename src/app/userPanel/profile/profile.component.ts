import { FooterComponent } from './../shared/footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { NavComponent } from '../shared/nav/nav.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { UsersapiService } from '../../services/usersapi.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2'
import { ToastModule } from 'primeng/toast';


@Component({
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    FormsModule,
    RouterLink,
    CommonModule,
    ToastModule
  ],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent implements OnInit {
  userId!: any;
  user!: any;
  favoriteProperties!: any;

  constructor(private router: Router, private propAPI: PropertiesapiService, private userAPI: UsersapiService, private messageService: MessageService) {
    this.userId = localStorage.getItem('userId');
    this.loadFavoriteProperties();
    this.loadUserData();
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  loadFavoriteProperties(): void {
    this.propAPI.getFavs(this.userId).subscribe({
      next: (data: any) => {
        this.favoriteProperties = data;
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }
  loadUserData(): void {
    this.userAPI.getUserData(this.userId).subscribe({
      next: (data: any) => {
        this.user = data;
        console.log(this.user);

      }, error: (err: any) => {
        console.log(err);
      }
    })
  }
  deleteFavorite(propertyId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      background: '#1e1e1e',
      color: 'white',
      confirmButtonColor: 'red',
      cancelButtonColor: "#A70A9A",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.propAPI.removeFav(this.userId, propertyId).subscribe({
          next: (data: any) => {
            this.loadFavoriteProperties();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Property deleted from favorites' });
          }, error: (err: any) => {
            console.log(err);
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Property kept in favorites' });
      }
    })
  }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl("/");
  }
}
