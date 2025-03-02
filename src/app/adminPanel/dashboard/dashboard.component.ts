import { Properties } from './../../modules/Properties';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavComponent } from '../../userPanel/shared/admin-nav/admin-nav.component';
import { ChartModule } from 'primeng/chart';
import { BarComponent } from '../../charts/bar/bar.component';
import { PieComponent } from '../../charts/pie/pie.component';
import { LineComponent } from '../../charts/line/line.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PropertiesapiService } from '../../services/propertiesapi.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [AdminNavComponent, ChartModule, BarComponent, PieComponent, LineComponent],
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
export class DashboardComponent {
  propsNumber !: number;
  typeProp1!: number;
  typeProp2!: number;
  constructor(private router: Router, private api: PropertiesapiService) {
    this.api.getProperties().subscribe((data) => {
      this.propsNumber = data.length;
      this.typeProp1 = data.filter((Properties) => Properties.purpose === "For Sale").length;
      this.typeProp2 = data.filter((Properties) => Properties.purpose === "For Rent").length;

    })
  }

}


