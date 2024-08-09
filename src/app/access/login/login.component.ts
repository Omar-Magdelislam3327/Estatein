import { Component } from '@angular/core';
import { UsersapiService } from '../../services/usersapi.service';
import { User } from '../../modules/User';
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = new User();
  constructor(private api: UsersapiService, private router: Router, private authService: AuthService) {}

  submit() {
    this.api.get().subscribe((data: any) => {
      let foundUser = data.find((user: any) => {
        return user.email === this.user.email && user.password === this.user.password;
      });
      if (foundUser) {
        if (foundUser.role === "user") {
          localStorage.setItem("user", JSON.stringify({ id: foundUser.id, role: foundUser.role , favorites:foundUser.favorites }));
          this.router.navigate(['/home']);
        } else if (foundUser.role === "agent") {
          this.router.navigate(['/agent/dashboard']);
          localStorage.setItem("agent",JSON.stringify({ id: foundUser.id, name: foundUser.name, role: foundUser.role , email:foundUser.email , phone : foundUser.phone , location : foundUser.location , image:foundUser.image }))
        } else if (foundUser.role === "admin") {
          this.router.navigate(['/admin/dashboard']);
          localStorage.setItem("admin","true")
        }
      } else {
        alert("Invalid Credentials");
      }
    });
  }
}
