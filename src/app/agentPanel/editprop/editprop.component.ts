import { PropertiesapiService } from './../../services/propertiesapi.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Properties } from '../../modules/Properties';
import { AgentNavComponent } from '../../userPanel/shared/agent-nav/agent-nav.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editprop',
  standalone: true,
  imports: [ReactiveFormsModule, AgentNavComponent],
  templateUrl: './editprop.component.html',
  styleUrl: './editprop.component.css',
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
export class EditpropComponent {
  props = new Properties();
  id!: any;
  propertyForm!: FormGroup;
  agentId!: any;
  constructor(private router: Router, private api: PropertiesapiService, private activ: ActivatedRoute, private fb: FormBuilder) {
    this.agentId = localStorage.getItem('agentId');
    this.id = this.activ.snapshot.params["id"];
    this.api.getPropertyById(this.id).subscribe((data: any) => {
      this.props = data;
    })
    this.propertyForm = this.fb.group({
      name: [Validators.required],
      description: [Validators.required],
      location: [Validators.required],
      size: [[Validators.required, Validators.min(1)]],
      price: [[Validators.required, Validators.min(1)]],
      roomsCount: [[Validators.required, Validators.min(1)]],
      bathroomsCount: [[Validators.required, Validators.min(1)]],
      floorsCount: [[Validators.required, Validators.min(1)]],
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
    this.api.getPropertyById(this.id).subscribe((data: any) => {
      this.props = data;
      this.propertyForm.patchValue({
        name: data.name,
        description: data.description,
        location: data.location,
        size: data.size,
        price: data.price,
        roomsCount: data.roomsCount,
        bathroomsCount: data.bathroomsCount,
        floorsCount: data.floorsCount,
        purpose: data.purpose,
        type: data.type,
        status: data.status,
        hasParking: data.hasParking,
        hasWifi: data.hasWifi,
        hasElevator: data.hasElevator,
        isFurnished: data.isFurnished
      });
    });
  }
  onFileSelected(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.propertyForm.patchValue({ [fieldName]: file });
    }
  }
  updateProperty() {
    if (this.propertyForm.valid) {
      const formData = new FormData();
      Object.keys(this.propertyForm.controls).forEach(key => {
        const value = this.propertyForm.get(key)?.value;
        if (value) {
          formData.append(key, value);
        }
      });

      this.api.updateProperty(this.id, formData).subscribe((data: any) => {
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
