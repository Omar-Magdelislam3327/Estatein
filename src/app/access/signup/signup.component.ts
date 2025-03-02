import { Component, OnDestroy } from '@angular/core';
import { UsersapiService } from '../../services/usersapi.service';
import { User } from '../../modules/User';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  subscription!: Subscription;
  signupForm!: FormGroup
  constructor(private api: UsersapiService, private router: Router, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;

      this.subscription = this.api.post(userData).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
