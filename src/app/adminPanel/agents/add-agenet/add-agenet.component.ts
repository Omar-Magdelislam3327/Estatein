import { Component } from '@angular/core';
import { AdminNavComponent } from '../../../userPanel/shared/admin-nav/admin-nav.component';
import { UsersapiService } from '../../../services/usersapi.service';
import { User } from '../../../modules/Properties';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { AgentapiserviceService } from '../../../services/agentapiservice.service';

@Component({
  selector: 'app-add-agenet',
  standalone: true,
  imports: [
    AdminNavComponent,
    CommonModule,
    ReactiveFormsModule
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
  agentForm!: FormGroup;
  selectedImage!: File;
  constructor(private api: AgentapiserviceService, private router: Router, private fb: FormBuilder) {
    this.agentForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      Image: [null, Validators.required],
      Password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }
  add() {
    const formData = new FormData();
    if (this.selectedImage) {
      formData.append('Image', this.selectedImage, this.selectedImage.name);
    }
    formData.append('Name', this.agentForm.get('Name')?.value);
    formData.append('Email', this.agentForm.get('Email')?.value);
    formData.append('Phone', this.agentForm.get('Phone')?.value);
    formData.append('Password', this.agentForm.get('Password')?.value);
    console.log(formData);
    this.api.addAgent(formData).subscribe({
      next: (res: any) => {
        console.log('Agent added successfully', res);
        this.router.navigateByUrl('/agents/list');
      },
      error: (error: any) => {
        console.error('Error adding agent', error);
      },
    })
  }
}
