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
  pageSize: number = 3;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  isFiltering: boolean = false;
  constructor(private api: PropertiesapiService) {
    this.getProperties();
    this.getLocations();
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
        console.log('Total props:', this.total);
        console.log('Pages needed:', this.fixed);
        console.log('Show pagination:', this.showPagination);
        console.log('props:', this.properties);
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
        const [min, max] = this.selectedSize.split('-').map(Number);
        propSize = property.size >= min && property.size <= max;
      }
      let propPrice = true;
      if (this.selectedPriceRange) {
        const [min, max] = this.selectedPriceRange.split('-').map(Number);
        propPrice = property.price >= min && property.price <= max;
      }
      this.isFiltering = true;
      return propType && propSize && propPrice && propLocation;
    });
    this.total = this.filteredProperties.length;
    this.fixed = Math.ceil(this.total / this.pageSize);
    this.showPagination = this.total > this.pageSize;
    this.isFiltering = true;

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
}
