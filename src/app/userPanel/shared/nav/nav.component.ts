import { UsersapiService } from './../../../services/usersapi.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userId!: any;
  constructor(private router: Router, private userApi: UsersapiService) {
    this.userId = localStorage.getItem('userId');
  }
}
