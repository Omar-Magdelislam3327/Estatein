import { Component } from '@angular/core';
import { NavComponent } from '../shared/nav/nav.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NavComponent , FooterComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
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
export class ServicesComponent {
  ngOnInit(){
    window.scrollTo(0 , 0);
  }
}
