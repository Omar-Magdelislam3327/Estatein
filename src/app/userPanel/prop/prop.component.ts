import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-prop',
  standalone: true,
  imports: [NavComponent, FooterComponent, HttpClientModule, RouterLink, NgFor, NgIf , FormsModule],
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
  property: any[] = [];
  filteredProperties: any[] = [];
  filters = {
    location: '',
    propertyType: '',
    priceRange: '',
    size: ''
  };

  constructor(private api: PropertiesapiService) {
    this.api.get().subscribe((data: any) => {
      this.filteredProperties = data.properties;
      this.property = data;
    });
  }
  ngOnInit(){
    window.scrollTo(0, 0);
  }
  searchProperties() {
    this.filteredProperties = this.property.filter(prop => {
      const location = prop.location || '';
      return (
        (this.filters.location ? location.includes(this.filters.location) : true) &&
        (this.filters.propertyType ? prop.type === this.filters.propertyType : true) &&
        (this.filters.priceRange ? this.isPriceInRange(prop.price, this.filters.priceRange) : true) &&
        (this.filters.size ? this.isSizeInRange(prop.area, this.filters.size) : true)
      );
    });
  }

  isPriceInRange(price: string, range: string): boolean {
    const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ''));
    const [min, max] = range.split('-').map(val => parseFloat(val.replace('<', '').replace(',', '')));
    return priceNumber >= (min || 0) && (max ? priceNumber <= max : true);
  }

  isSizeInRange(size: number, range: string): boolean {
    const [min, max] = range.split('-').map(val => parseFloat(val));
    return size >= (min || 0) && (max ? size <= max : true);
  }
}
