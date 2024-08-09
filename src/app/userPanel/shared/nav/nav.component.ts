import { UsersapiService } from './../../../services/usersapi.service';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive , NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userRole!:string;
  constructor(private router: Router , private userApi:UsersapiService) {
    const user = localStorage.getItem('user');
    const agent = localStorage.getItem('agent');
    const admin = localStorage.getItem('admin');

    if (user) {
      this.userRole = 'user';
    } else if (agent) {
      this.userRole = 'agent';
    } else if (admin) {
      this.userRole = 'admin';
    }
    this.userApi.get().subscribe((data:any)=>{
    })
  }
}
