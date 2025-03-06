import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
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
export class HomeComponent {
  prop!: any
  //
  isFavorite: any[] = [];
  userId: any;
  constructor(private router: Router, private api: PropertiesapiService) {
    this.userId = localStorage.getItem('userId');
    this.getFavs();
    this.api.getProperties().subscribe((data: any) => {
      this.prop = data.data.slice(0, 3);
    })
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  getFavs() {
    this.api.getFavs(this.userId).subscribe({
      next: (data: any) => {
        this.isFavorite = data;
        console.log('Favorites:', data);
      },
      error: (err) => console.error(err)
    });
  }

  isFavorited(id: number): boolean {
    return this.isFavorite.some((prop: any) => prop.id === id);
  }

  favProp(id: number) {
    this.api.addPropertyToFavorites(this.userId, id).subscribe({
      next: () => {
        this.getFavs();
        console.log(`Added property ${id} to favorites`);
      },
      error: (err) => console.error(err)
    });
  }

  deleteFav(id: number) {
    this.api.removeFav(this.userId, id).subscribe({
      next: () => {
        this.getFavs();
        console.log(`Removed property ${id} from favorites`);
      },
      error: (err) => console.error(err)
    });
  }

  toggleFav(event: Event, id: number) {
    event.stopPropagation();

    if (this.isFavorited(id)) {
      if (!this.isUserLoggedIn()) {
        this.showLoginAlert();
        return;
      }
      this.deleteFav(id);
    } else {
      if (!this.isUserLoggedIn()) {
        this.showLoginAlert();
        return;
      }
      this.favProp(id);
    }
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
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login';
      }
    });
  }
  callPhone(phone: string, event: Event) {
    event.stopPropagation();
    window.location.href = `tel:${phone}`;
  }

  openWhatsApp(phone: string, event: Event) {
    event.stopPropagation();
    window.open(`https://wa.me/${phone}`, '_blank');
  }

}
