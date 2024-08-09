import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavComponent , FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
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
export class AboutComponent {
  constructor(private router:Router){
    let loggedIn = JSON.parse(localStorage.getItem("user") || "null");
    let loggedAgentIn = JSON.parse(localStorage.getItem("agent") || "null");
    let loggedAdminIn = JSON.parse(localStorage.getItem("admin") || "null");
    if(!loggedIn && !loggedAgentIn && !loggedAdminIn){
      this.router.navigate(['/']);
    }
  }
  ngOnInit(){
    window.scrollTo(0, 0);
  }
}
