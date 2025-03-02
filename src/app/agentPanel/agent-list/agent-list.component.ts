import { Agent } from './../../modules/Properties';
import { Component } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Properties } from '../../modules/Properties';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AgentapiserviceService } from '../../services/agentapiservice.service';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, RouterLink, AgentNavComponent],
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
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
export class AgentListComponent {
  props: any[] = [];
  agent!: Agent;
  agentId!: any;

  constructor(
    private api: PropertiesapiService,
    private activ: ActivatedRoute,
    private router: Router,
    private agentAPI: AgentapiserviceService
  ) {

    this.agentId = localStorage.getItem('agentId');
    this.getProps();
  }
  getProps() {
    this.agentAPI.getPropetiesByAgentId(this.agentId).subscribe((data: any) => {
      this.props = data;
    });
  }
  makeSold(id: number) {
    this.api.makePropertySold(id).subscribe((data: any) => {
      this.getProps();
    });
  }
}
