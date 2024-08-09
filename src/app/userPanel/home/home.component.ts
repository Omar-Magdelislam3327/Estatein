import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { NgFor , NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    FooterComponent,
    NgFor,
    NgIf,
    SlicePipe,
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
  prop!:any
  constructor(private router: Router, private api: PropertiesapiService) {
    this.api.get().subscribe((data:any)=>{
      this.prop=data
    })
    let loggedIn = JSON.parse(localStorage.getItem("user") || "null");
    let loggedAgentIn = JSON.parse(localStorage.getItem("agent") || "null");
    let loggedAdminIn = JSON.parse(localStorage.getItem("admin") || "null");

    if (!loggedIn && !loggedAgentIn && !loggedAdminIn) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit(){
    window.scrollTo(0, 0);
  }

}
