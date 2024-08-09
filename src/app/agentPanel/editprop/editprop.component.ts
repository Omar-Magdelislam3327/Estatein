import { PropertiesapiService } from './../../services/propertiesapi.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Properties } from '../../modules/Properties';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-editprop',
  standalone: true,
  imports: [FormsModule , AgentNavComponent],
  templateUrl: './editprop.component.html',
  styleUrl: './editprop.component.css',
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
export class EditpropComponent {
  props = new Properties();
  id!:any
  constructor(private router: Router , private api : PropertiesapiService , private activ : ActivatedRoute) {
    this.id = this.activ.snapshot.params["id"];
    let loggedIn = JSON.parse(localStorage.getItem("agent") || "false")
    if (!loggedIn) {
      this.router.navigateByUrl("/home");
    }
    this.api.getById(this.id).subscribe((data:any)=>{
      this.props = data;
    })
  }
  update(){
    this.api.put(this.id , this.props).subscribe((data:any)=>{
      console.log(data);
      this.router.navigateByUrl("/agent/dashboard")
    })
  }
}
