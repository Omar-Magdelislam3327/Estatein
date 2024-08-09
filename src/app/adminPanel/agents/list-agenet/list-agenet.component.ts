import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../userPanel/shared/admin-nav/admin-nav.component';
import { UsersapiService } from '../../../services/usersapi.service';
import { User } from '../../../modules/Properties';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-list-agenet',
  standalone: true,
  imports: [
    AdminNavComponent,
    NgFor,
    RouterLink
  ],
  templateUrl: './list-agenet.component.html',
  styleUrl: './list-agenet.component.css',
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
export class ListAgenetComponent {
  agent!:any
  constructor(private api:UsersapiService , private router : Router) {
    let loggedIn = JSON.parse(localStorage.getItem("admin") || "false");
    if (!loggedIn) {
      this.router.navigateByUrl('/home');
    }
    this.api.get().subscribe((data:any)=>{
      this.agent = data.filter((agents : User)=> agents.role === "agent")
      console.log(this.agent);

    })
  }
}
