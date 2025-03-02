import { Component } from '@angular/core';
import { PropertiesapiService } from '../../services/propertiesapi.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-addprop',
  standalone: true,
  imports: [FormsModule, CommonModule, AgentNavComponent, ReactiveFormsModule],
  templateUrl: './addprop.component.html',
  styleUrls: ['./addprop.component.css'],
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
export class AddpropComponent {
  props !: any;
  propertyForm!: FormGroup;
  agentId!: any;
  constructor(private api: PropertiesapiService, private fb: FormBuilder) {
    this.agentId = localStorage.getItem('agentId');
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      size: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      roomsCount: [0, [Validators.required, Validators.min(1)]],
      bathroomsCount: [0, [Validators.required, Validators.min(1)]],
      floorsCount: [0, [Validators.required, Validators.min(1)]],
      headImage: [null],
      image1: [null],
      image2: [null],
      image3: [null],
      video: [null],
      purpose: ['ForSale', Validators.required],
      type: ['House', Validators.required],
      status: ['Available', Validators.required],
      hasParking: [false],
      hasWifi: [false],
      hasElevator: [false],
      isFurnished: [false],
      agentId: [this.agentId, Validators.required]
    });
  }
  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.propertyForm.patchValue({ [fieldName]: file });
    }
  }
  addProperty() {
    if (this.propertyForm.valid) {
      const formData = new FormData();
      Object.keys(this.propertyForm.controls).forEach(key => {
        const value = this.propertyForm.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      });

      this.api.addProperty(formData).subscribe((data: any) => {
        console.log('Property added successfully', data);
      });
    } else {
      console.error('Form is invalid');
      Object.keys(this.propertyForm.controls).forEach(key => {
        if (this.propertyForm.get(key)?.invalid) {
          console.error(`Field '${key}' has invalid value.`);
        }
      });
      console.log(this.propertyForm.value);
    }
  }
}
