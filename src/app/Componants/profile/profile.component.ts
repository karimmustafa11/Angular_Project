
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: User | null = null;
  loading = true;
  errorMsg: string | null = null;
  private userSub!: Subscription;

  profileForm: FormGroup;
  profSuccess: string | null = null;
  profError: string | null = null;
  profLoading = false;

  passwordForm: FormGroup;
  pwSuccess: string | null = null;
  pwError: string | null = null;
  pwLoading = false;

  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      profileImage: [null]
    });
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.matchNewPasswords
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.userService.refreshUserData();
    this.userSub = this.userService.userData$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.errorMsg = null;
        this.profileForm.patchValue({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          profileImage: user.profileImage || null
        });
        this.previewUrl = user.profileImage || null;
      } else {
        this.userData = null;
        this.errorMsg = 'Failed to load profile.';
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goHome() {
    this.router.navigate(['']);
  }

  private matchNewPasswords(group: FormGroup) {
    const n = group.get('newPassword')?.value;
    const c = group.get('confirmPassword')?.value;
    return n === c ? null : { notMatching: true };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.profileForm.patchValue({
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSaveProfile() {
    this.profSuccess = null;
    this.profError = null;
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const vals = this.profileForm.value;
    const updated: Partial<User> = {
      firstName: vals.firstName,
      lastName: vals.lastName,
      profileImage: vals.profileImage
    };
    this.profLoading = true;
    this.userService.updateUser(updated).subscribe(u => {
      if (u) {
        this.profSuccess = 'Profile updated successfully.';
      } else {
        this.profError = 'Failed to update profile.';
      }
      this.profLoading = false;
    }, err => {
      console.error(err);
      this.profError = 'Error updating profile.';
      this.profLoading = false;
    });
  }

  onChangePassword() {
    this.pwSuccess = null;
    this.pwError = null;
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    const { oldPassword, newPassword } = this.passwordForm.value;
    this.pwLoading = true;
    this.userService.changePassword(oldPassword, newPassword).subscribe(ok => {
      if (ok) {
        this.pwSuccess = 'Password changed successfully.';
        this.passwordForm.reset();
      } else {
        this.pwError = 'Failed to change password.';
      }
      this.pwLoading = false;
    }, err => {
      console.error(err);
      this.pwError = 'Error changing password.';
      this.pwLoading = false;
    });
  }
}
