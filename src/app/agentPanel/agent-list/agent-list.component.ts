import { Agent } from './../../modules/Properties';
import { Component } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Properties } from '../../modules/Properties';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
  id!: any;
  props: Properties[] = [];
  agent!: Agent;
  prope: Properties[] = [];

  constructor(
    private api: PropertiesapiService,
    private activ: ActivatedRoute,
    private router: Router
  ) {
    const loggedInAgent = JSON.parse(localStorage.getItem("agent") || "false");
    if (!loggedInAgent) {
      this.router.navigate(['/']);
    } else {
      this.agent = loggedInAgent;
    }

    this.id = this.activ.snapshot.params["id"];
    this.api.get().subscribe((data: Properties[]) => {
      console.log("All properties data:", data);
      this.prope = data.filter((property: Properties) =>
        property.agent.some((agent: Agent) => {
          console.log(`Property agent ID: ${agent.id}, Logged-in agent ID: ${this.agent.id}`);
          return agent.id === this.agent.id;
        })
      );
      console.log("Filtered properties:", this.prope);
    });
  }

  remove(id: number) {
    this.api.delete(id).subscribe(() => {
      this.prope = this.prope.filter((property: Properties) => property.id !== id);
    });
  }
}
