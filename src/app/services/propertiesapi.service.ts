import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Properties } from '../modules/Properties';
import { ApiFunctionService } from './api-function.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesapiService {
  baseUrl = 'https://mogarealstate.runasp.net/api'
  constructor(private http: HttpClient) {
  }
  getProperties(): Observable<Properties[]> {
    return this.http.get<Properties[]>(`${this.baseUrl}/Properties`);
  }
  getPropertyById(propertyId: number): Observable<Properties> {
    return this.http.get<Properties>(`${this.baseUrl}/Properties/${propertyId}`);
  }
  addProperty(property: FormData): Observable<Properties> {
    return this.http.post<Properties>(`${this.baseUrl}/Properties`, property);
  }
  updateProperty(id: number, property: FormData): Observable<Properties> {
    return this.http.put<Properties>(`${this.baseUrl}/Properties/${id}`, property);
  }
  deleteProperty(id: number): Observable<Properties> {
    return this.http.delete<Properties>(`${this.baseUrl}/Properties/${id}`);
  }
  makePropertySold(id: number): Observable<Properties> {
    return this.http.put<Properties>(`${this.baseUrl}/Properties/MakePropertySold?propertyId=${id}`, null);
  }
  //
  addPropertyToFavorites(userId: number, propertyId: number): Observable<Properties> {
    return this.http.post<Properties>(`${this.baseUrl}/Users/FavoriteProperty/${userId}/${propertyId}`, null);
  }
  isFavorite(userId: number, propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/Users/IsFavorite/${userId}/${propertyId}`);
  }
  getFavs(userId: string): Observable<Properties[]> {
    return this.http.get<Properties[]>(`${this.baseUrl}/Users/FavoriteProperties/${userId}`);
  }
  removeFav(userId: number, propertyId: number): Observable<Properties> {
    return this.http.delete<Properties>(`${this.baseUrl}/Users/Favorite/${userId}/${propertyId}`);
  }
  //
  getAllLocalizations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Properties/AllLocations`);
  }
}
