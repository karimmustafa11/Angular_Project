import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMsgComponent } from '../shared/validation-msg/validation-msg.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, FormsModule, ValidationMsgComponent],

})
export class SignupComponent {
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  signupForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
      profileImage: [null, Validators.required]
    }, {
      validators: this.passwordsMatch
    });

  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      // Handle form submission logic here
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.signupForm.patchValue({ profileImage: file });
      this.signupForm.get('profileImage')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }
}
