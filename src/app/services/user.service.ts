
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  profileImage?: string;
  email?: string;
  // أضف حقول أخرى حسب db.json
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProfileImageFromStorage();
    this.loadUserData();
  }

  public loadProfileImageFromStorage() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const key = `profileImage_${userId}`;
      const savedImage = localStorage.getItem(key);
      this.profileImageSubject.next(savedImage || null);
    } else {
      this.profileImageSubject.next(null);
    }
  }

  setProfileImage(url: string) {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const key = `profileImage_${userId}`;
      localStorage.setItem(key, url);
    }
    this.profileImageSubject.next(url);
  }

  loadUserData(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<User>(`http://localhost:3000/users/${userId}`)
        .pipe(
          tap(user => {
            this.userDataSubject.next(user);
          }),
          catchError(err => {
            console.error('Failed to load user data', err);
            this.userDataSubject.next(null);
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.userDataSubject.next(null);
    }
  }

  refreshUserData(): void {
    this.loadUserData();
  }
}
