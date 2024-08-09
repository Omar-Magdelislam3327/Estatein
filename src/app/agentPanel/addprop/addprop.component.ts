import { Component } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { Properties } from '../../modules/Properties';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-addprop',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf , AgentNavComponent],
  templateUrl: './addprop.component.html',
  styleUrls: ['./addprop.component.css'],
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
export class AddpropComponent {
  props = new Properties();

  constructor(private api: PropertiesapiService, private router: Router) {
    let loggedIn = JSON.parse(localStorage.getItem("agent") || "false");
    if (!loggedIn) {
      this.router.navigateByUrl('/home');
    } else {
      const agentInfo = JSON.parse(localStorage.getItem("agent") || "{}");
      this.props.agent = [{
        id: agentInfo.id,
        name: agentInfo.name,
        phone: agentInfo.phone,
        email: agentInfo.email,
        image: agentInfo.image,
        location : agentInfo.location
      }];
    }
  }

  add() {
    this.api.post(this.props).subscribe((data: any) => {
      console.log(data);
      location.reload();
    });
  }
}
