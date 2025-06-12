import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMsgComponent } from '../shared/validation-msg/validation-msg.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ValidationMsgComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  loginForm: FormGroup;

  showSuccessMessage = false;
  showErrorMessage = false;
  closeErrorMessage() {
    this.showErrorMessage = false;
  }
  countdownWidth = 100;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  startCountdownAndRedirect() {
    this.showSuccessMessage = true;
    let countdown = 100;
    const interval = setInterval(() => {
      countdown -= 5;
      this.countdownWidth = countdown;

      if (countdown <= 0) {
        clearInterval(interval);
        this.router.navigate(['']);
      }
    }, 100);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const form = this.loginForm.value;

      const loginPayload = {
        email: form.username,
        password: form.password
      };

      this.http.post('http://localhost:3000/login', loginPayload).subscribe({
        next: (res: any) => {
          console.log('Login response:', res);
          if (res && res.accessToken) {
            console.log('Registration successful:', res);

            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('userId', res.user?.id);
            this.showSuccessMessage = true;
            this.countdownWidth = 100;

            const interval = setInterval(() => {
              this.countdownWidth -= 5;
              if (this.countdownWidth <= 0) {
                clearInterval(interval);
                if (this.authService.isAdmin()) {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['']);
                }
              }
            }, 100);
          } else {
            console.error('Invalid response format');
            this.showErrorMessage = true;
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          this.showErrorMessage = true;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
