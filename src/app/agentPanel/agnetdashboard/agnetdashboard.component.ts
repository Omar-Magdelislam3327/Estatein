import { Component, OnInit } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-agnetdashboard',
  standalone: true,
  imports: [NgFor, RouterLink, AgentNavComponent],
  templateUrl: './agnetdashboard.component.html',
  styleUrls: ['./agnetdashboard.component.css'],
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
export class AgnetdashboardComponent {
  constructor(private router: Router) {

  }
}
