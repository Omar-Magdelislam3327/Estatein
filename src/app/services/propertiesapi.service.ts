import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Properties } from '../modules/Properties';
import { ApiFunctionService } from './api-function.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesapiService extends ApiFunctionService<Properties> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/properties", http);
  }

}
