import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  constructor() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      this.profileImageSubject.next(savedImage);
    }
  }

  setProfileImage(url: string) {
    this.profileImageSubject.next(url);
  }
}
