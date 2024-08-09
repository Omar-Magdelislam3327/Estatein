import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminNavComponent } from '../../../userPanel/shared/admin-nav/admin-nav.component';
import { PropertiesapiService } from '../../../services/propertiesapi.service';
import { NgFor } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-listprop',
  standalone: true,
  imports: [
    AdminNavComponent,
    RouterLink,
    NgFor
  ],
  templateUrl: './listprop.component.html',
  styleUrl: './listprop.component.css',
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
export class ListpropComponent {
  prop!:any;
  id!:any;
  constructor(private router : Router , private activ : ActivatedRoute , private api : PropertiesapiService){
    this.id = this.activ.snapshot.params["id"];
    this.api.get().subscribe((data:any)=>{
      this.prop = data
    })
    let loggedIn = JSON.parse(localStorage.getItem("admin") || "false");
    if (!loggedIn){
      this.router.navigate(['/home']);
    }
  }
  remove(id:number){
    this.api.delete(id).subscribe((data:any)=>{
      location.reload()
    })
  }
}
