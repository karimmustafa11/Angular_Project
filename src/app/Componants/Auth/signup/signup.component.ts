import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationMsgComponent } from '../shared/validation-msg/validation-msg.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ValidationMsgComponent, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, RouterLink, RouterLinkActive],
})
export class SignupComponent {
  showSuccessMessage = false;
  countdownWidth = 100;
  startCountdownAndRedirect() {
    this.showSuccessMessage = true;
    let countdown = 100;
    const interval = setInterval(() => {
      countdown -= 3;
      this.countdownWidth = countdown;

      if (countdown <= 0) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 50);
  }

  signupForm: FormGroup;
  submitted = false;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
        profileImage: [null],
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.signupForm.patchValue({
          profileImage: reader.result
        });
        this.signupForm.get('profileImage')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      const form = this.signupForm.value;

      const userPayload = {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        profileImage: form.profileImage,
      };

      this.http.post('http://localhost:3000/register', userPayload).subscribe({
        next: (res: any) => {
          console.log('Registration successful:', res);
          if (res && res.accessToken) {
            this.showSuccessMessage = true;
            localStorage.setItem('accessToken', res.accessToken);
            this.startCountdownAndRedirect();
          } else {
            console.error('Invalid response format');
            alert('Server response format is invalid');
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          if (err.status === 409) {
            alert('Email already exists');
          } else {
            alert('Registration failed: ' + (err.error?.message || 'Please try again.'));
          }
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

}
