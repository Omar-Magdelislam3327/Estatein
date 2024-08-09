import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../userPanel/shared/admin-nav/admin-nav.component';
import { UsersapiService } from '../../../services/usersapi.service';
import { User } from '../../../modules/Properties';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-add-agenet',
  standalone: true,
  imports: [
    AdminNavComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-agenet.component.html',
  styleUrl: './add-agenet.component.css',
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
export class AddAgenetComponent {
  agent = new User();
  constructor(private api : UsersapiService , private router : Router) {
    let loggedIn = JSON.parse(localStorage.getItem("admin") || "false");
    if (!loggedIn) {
      this.router.navigateByUrl('/home');
    }
    this.api.get().subscribe((data:any)=>{
      console.log(data);
    })
  }
  add(){
    if(this.agent){
      this.agent.role = "agent"
      this.api.post(this.agent).subscribe((data:any)=>{
        location.reload();

      })
    }
  }
}
