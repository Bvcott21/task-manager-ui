import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterRequestDTO } from '../dto/register-request.dto';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: RegisterRequestDTO = {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    console.log("Register submitted", this.registerForm);
    this.authService.register(this.registerForm).subscribe({
      next: (response) => {
        console.log("Registration successful", response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error("Registration failed", error);
        this.errorMessage = error.error.message;
      }
    })
  }
}
