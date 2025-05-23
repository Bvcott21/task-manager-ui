import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequestDTO } from '../dto/login-request.dto';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: LoginRequestDTO = {
    emailOrUsername: '',
    password: ''
  }

  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    console.log("Login submitted", this.loginForm);
    this.authService.login(this.loginForm).subscribe({
      // Process the successful login response e. g. save token, navigate, etc.
      next: (response) => {
        console.log("Login successful", response);
      },
      error: (error) => {
        console.error("Login failed", error);
        this.errorMessage = "Invalid credentials. Please try again.";
      }
    })
  }
}
