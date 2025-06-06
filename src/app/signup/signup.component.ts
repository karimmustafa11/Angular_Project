import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ValidationMsgComponent } from '../shared/validation-msg/validation-msg.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ValidationMsgComponent, FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
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
        profileImage: [null],  // Remove required validator temporarily
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
      this.signupForm.patchValue({ profileImage: file });
      this.signupForm.get('profileImage')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    // Debug information
    console.log('Form Values:', this.signupForm.value);
    console.log('Form Valid:', this.signupForm.valid);
    console.log('Form Errors:', this.signupForm.errors);

    // Check each control's validity
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      console.log(`${key} validity:`, {
        valid: control?.valid,
        errors: control?.errors,
        value: control?.value
      });
    });

    if (this.signupForm.valid) {
      const form = this.signupForm.value;

      const userPayload = {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,

      };

      this.http.post('http://localhost:3000/register', userPayload).subscribe({
        next: (res: any) => {
          console.log('Registration successful:', res);
          if (res && res.accessToken) {
            this.showSuccessMessage = true;

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
    }
    else {
      console.log('Form validation errors:', this.signupForm.errors);

      // Show specific validation errors
      let errorMessage = 'Please fix the following errors:\n';
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.errors) {
          errorMessage += `\n${key}: `;
          if (control.errors['required']) errorMessage += 'This field is required.';
          if (control.errors['email']) errorMessage += 'Invalid email format.';
          if (control.errors['minlength']) errorMessage += 'Minimum length not met.';
          if (key === 'confirmPassword' && this.signupForm.errors?.['notMatching'])
            errorMessage += 'Passwords do not match.';
        }
      });

      this.signupForm.markAllAsTouched();
    }
  }
}
