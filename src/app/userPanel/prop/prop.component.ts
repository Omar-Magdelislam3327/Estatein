import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-prop',
  standalone: true,
  imports: [NavComponent, FooterComponent, HttpClientModule, RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.css'],
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
export class PropComponent implements OnInit {
  properties: any[] = [];
  filteredProperties: any[] = [];
  //
  selectedLocation: any = '';
  selectedPriceRange: any = '';
  selectedType: any = '';
  selectedSize: any = '';
  //
  locations!: any[];
  //
  currentPage: number = 1;
  pageSize: number = 12;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  isFiltering: boolean = false;
  //
  userId: any;
  isFavorite: any[] = [];
  constructor(private api: PropertiesapiService) {
    this.userId = localStorage.getItem('userId');
    this.getProperties();
    this.getLocations();
    this.getFavs();
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }
  getProperties() {
    this.api.getProperties().subscribe({
      next: (data: any) => {
        this.properties = data.data;
        console.log(data);
        this.total = data.count;
        this.fixed = Math.ceil(this.total / this.pageSize);
        this.showPagination = this.total > this.pageSize;
        this.isFiltering = false;
        this.filteredProperties = [...this.properties];
      },
      error: (err) => console.error(err),
    });
  }
  getLocations() {
    this.api.getAllLocalizations().subscribe({
      next: (data: any) => {
        this.locations = data.locations;
        console.log(this.locations);
      },
      error: (err) => console.error(err),
    });
  }
  filterProperties() {
    this.filteredProperties = this.properties.filter((property) => {
      let propLocation = this.selectedLocation ? property.location === this.selectedLocation : true;
      let propType = this.selectedType ? property.type === this.selectedType : true;

      let propSize = true;
      if (this.selectedSize) {
        console.log('Selected Size:', this.selectedSize);

        if (this.selectedSize.includes('>')) {
          const min = parseInt(this.selectedSize.replace('>', '').trim(), 10);
          console.log('Property Size:', property.size, 'Selected Min:', min, 'Condition Met:', property.size > min);
          propSize = property.size > min;
        } else {
          const [min, max] = this.selectedSize.split('-').map(Number);
          propSize = property.size >= min && property.size <= max;
        }
      }

      let propPrice = true;
      if (this.selectedPriceRange) {
        console.log('Selected Price:', this.selectedPriceRange);

        if (this.selectedPriceRange.includes('>')) {
          const min = parseInt(this.selectedPriceRange.replace('>', '').trim(), 10);
          console.log('Property Price:', property.price, 'Selected Min:', min, 'Condition Met:', property.price > min);
          propPrice = property.price > min;
        } else {
          const [min, max] = this.selectedPriceRange.split('-').map(Number);
          propPrice = property.price >= min && property.price <= max;
        }
      }

      return propType && propSize && propPrice && propLocation;
    });

    this.total = this.filteredProperties.length;
    this.fixed = Math.ceil(this.total / this.pageSize);
    this.showPagination = this.total > this.pageSize;

    console.log('Filtered Properties:', this.filteredProperties);
    console.log('New Total:', this.total);
    console.log('Updated Pages Needed:', this.fixed);
    console.log('Show Pagination:', this.showPagination);
  }


  clearFilter() {
    this.selectedLocation = '';
    this.selectedType = '';
    this.selectedSize = '';
    this.selectedPriceRange = '';
    this.filteredProperties = [...this.properties];
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.isFiltering ? this.filterProperties() : this.getProperties();
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
