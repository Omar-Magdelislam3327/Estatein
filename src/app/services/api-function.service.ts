import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionService<T> {
  constructor(@Inject(String) public url: string, protected http: HttpClient) {}

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  getById(id: any): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  post(obj: any): Observable<T> {
    return this.http.post<T>(this.url, obj);
  }

  put(id: any, obj: any): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, obj);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
