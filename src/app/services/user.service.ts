import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  constructor() {

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
}