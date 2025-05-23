import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequestDTO } from "../auth/dto/login-request.dto";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private baseUrl = 'http://localhost:8080/api/v1/auth/';

    constructor(private http: HttpClient) { }

    login(request: LoginRequestDTO): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, request);
    }

}