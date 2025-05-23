import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {
    console.log('AuthService created with HttpClient:', this.http);
  }

  login(request: any): Observable<any> {
    console.log('Making login request to:', `${this.baseUrl}/login`);
    return this.http.post(`${this.baseUrl}/login`, request);
  }

  register(request: any): Observable<any> {
    console.log('Making register request to:', `${this.baseUrl}/register`);
    return this.http.post(`${this.baseUrl}/register`, request);
  }
}