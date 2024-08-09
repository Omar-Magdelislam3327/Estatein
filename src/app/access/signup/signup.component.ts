import { Component, OnDestroy } from '@angular/core';
import { UsersapiService } from '../../services/usersapi.service';
import { User } from '../../modules/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  user = new User();
  subscription: Subscription;

  constructor(private api: UsersapiService, private router: Router) {
    this.subscription = this.api.get().subscribe((data: any) => {
      console.log(data);
    });
  }

  submit() {
    if (this.user) {
      this.user.image = "assets/vendors/imgs/user.png";
      this.user.role = "user";
      this.api.post(this.user).subscribe((data: any) => {
        console.log(data);
        this.router.navigateByUrl("");
      }, (error: any) => {
        console.error(error);
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
