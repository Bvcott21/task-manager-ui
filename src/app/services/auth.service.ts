import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInfoDTO } from '../dto/user-info.dto';
import { LoginRequestDTO } from '../auth/dto/login-request.dto';
import { RegisterRequestDTO } from '../auth/dto/register-request.dto';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<UserInfoDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AuthService created with HttpClient:', this.http);
    this.checkAuthStatus();
  }

  login(request: LoginRequestDTO): Observable<any> {
    console.log('Making login request to:', `${this.baseUrl}/login`);
    return this.http.post(`${this.baseUrl}/login`, request, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        this.currentUserSubject.next({
          username: response.username,
          email: response.email,
          authenticated: true
        });
      })
    );
  }

  register(request: RegisterRequestDTO): Observable<any> {
    console.log('Making register request to:', `${this.baseUrl}/register`);
    return this.http.post(`${this.baseUrl}/register`, request, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        this.currentUserSubject.next({
          username: response.username,
          email: response.email,
          authenticated: true
        });
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.currentUserSubject.next(null);
      })
    );
  }

  getCurrentUser(): Observable<UserInfoDTO> {
    return this.http.get<UserInfoDTO>(`${this.baseUrl}/me`, {
      withCredentials: true
    });
  }

  isAuthenticated(): Observable<{authenticated: boolean}> {
    return this.http.get<{authenticated: boolean}>(`${this.baseUrl}/verify`, { 
      withCredentials: true 
    });
  }

  private checkAuthStatus(): void {
    this.getCurrentUser().subscribe({
      next: (userInfo: UserInfoDTO) => {
        if(userInfo.authenticated) {
          this.currentUserSubject.next(userInfo);
        }
      },
      error: () => {
        this.currentUserSubject.next(null);
      }
    });
  }

  get currentUserValue(): UserInfoDTO | null {
    return this.currentUserSubject.value;
  }
}  