import { Component, OnInit } from '@angular/core';
import { User } from './../../modules/User';
import { Properties } from './../../modules/Properties';
import { UsersapiService } from '../../services/usersapi.service';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { NgFor, NgIf } from '@angular/common';
import { NavComponent } from '../shared/nav/nav.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { favorites } from '../../modules/favorites';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  standalone:true,
  imports:[
    NgIf,
    NgFor,
    NavComponent,
    FormsModule,
    RouterLink
  ],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent implements OnInit {
  user= new User()
  favoriteProperties: Properties[] = [];
  id!:any;
    constructor(private userApi: UsersapiService, private propApi: PropertiesapiService , private active : ActivatedRoute , private router : Router) {
      let loggedIn = JSON.parse(localStorage.getItem("user") || "false");
      if (!loggedIn) {
      this.router.navigateByUrl('/');
    }
      this.id = this.active.snapshot.params["id"];
    }
    // remove(id:any){
    //   this.loadFavoriteProperties;
    //   this.getUserId;
    //   const userId = this.getUserId();
    //   const userString = localStorage.getItem('user');
    //   this.userApi.getById(userId).subscribe((data:any)=>{
    //     this.user = data;
    //     this.propApi.delete(id).subscribe((res:any)=>{
    //       console.log(this.user.favorites);
    //       console.log(res);
    //     })
    //   })
    // }


    ngOnInit(): void {
      const userId = this.getUserId();
      if (userId) {
        this.userApi.getById(userId).subscribe((user: User) => {
          this.user = user;
          this.loadFavoriteProperties();
        });
      }
      window.scrollTo(0, 0);
    }

  getUserId(): number | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userId = JSON.parse(userString).id;
      return userId;
    }
    return null;
  }

  loadFavoriteProperties(): void {
    if (this.user) {
      this.user.favorites.forEach((propertyId) => {
        this.propApi.getById(propertyId).subscribe((property: Properties) => {
          this.favoriteProperties.push(property);
        });
      });
    }
  }
  logout(){
    localStorage.removeItem("user");
    this.router.navigateByUrl("/")
  }
}
