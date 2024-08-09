import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agent-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './agent-nav.component.html',
  styleUrl: './agent-nav.component.css'
})
export class AgentNavComponent {
  constructor(private router: Router) { }
  logout(){
    localStorage.removeItem("agent");
  }
}
