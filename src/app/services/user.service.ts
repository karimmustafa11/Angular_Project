
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  profileImage?: string;
  phone?: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private profileImageSubject = new BehaviorSubject<string | null>(null);
  profileImage$ = this.profileImageSubject.asObservable();

  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProfileImageFromStorage();
    this.loadUserData();
  }

  private getUserId(): string | null {
    return localStorage.getItem('userId');
  }


  loadUserData(): void {
    const userId = this.getUserId();
    if (!userId) {
      this.userDataSubject.next(null);
      return;
    }
    this.http.get<User>(`${this.apiUrl}/${userId}`)
      .pipe(
        tap(user => {
          this.userDataSubject.next(user);
          if (user.profileImage) {
            this.profileImageSubject.next(user.profileImage);
            localStorage.setItem(`profileImage_${userId}`, user.profileImage);
          }
        }),
        catchError(err => {
          console.error('Failed to load user data', err);
          this.userDataSubject.next(null);
          return of(null);
        })
      )
      .subscribe();
  }


  refreshUserData(): void {
    this.loadUserData();
  }


  loadProfileImageFromStorage(): void {
    const userId = this.getUserId();
    if (userId) {
      const key = `profileImage_${userId}`;
      const saved = localStorage.getItem(key);
      this.profileImageSubject.next(saved || null);
    } else {
      this.profileImageSubject.next(null);
    }
  }


  setProfileImage(url: string): void {
    const userId = this.getUserId();
    if (userId) {
      localStorage.setItem(`profileImage_${userId}`, url);
    }
    this.profileImageSubject.next(url);
  }


  updateUser(updated: Partial<User>): Observable<User | null> {
    const userId = this.getUserId();
    if (!userId) return of(null);

    const current = this.userDataSubject.getValue();
    if (current) {
      const merged: User = { ...current, ...updated };
      return this.http.put<User>(`${this.apiUrl}/${userId}`, merged).pipe(
        tap(u => {
          this.userDataSubject.next(u);
          if (u.profileImage) {
            this.setProfileImage(u.profileImage);
          }
        }),
        catchError(err => {
          console.error('Failed to update user', err);
          return of(null);
        })
      );
    } else {

      return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
        switchMap(user => {
          if (!user) return of(null);
          const merged: User = { ...user, ...updated };
          return this.http.put<User>(`${this.apiUrl}/${userId}`, merged).pipe(
            tap(u => {
              this.userDataSubject.next(u);
              if (u.profileImage) {
                this.setProfileImage(u.profileImage);
              }
            }),
            catchError(err => {
              console.error('Failed to update after fetch', err);
              return of(null);
            })
          );
        }),
        catchError(err => {
          console.error('Failed to fetch user before update', err);
          return of(null);
        })
      );
    }
  }

  changePassword(oldPassword: string, newPassword: string): Observable<boolean> {
    const userId = this.getUserId();
    if (!userId) return of(false);

    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      tap(user => console.log('changePassword: fetched user:', user)),
      switchMap(user => {
        if (!user) {
          console.error('changePassword: no user returned');
          return of(false);
        }
        if (user.password === undefined) {

          return of(false);
        }
        if (user.password !== oldPassword) {
          console.error('changePassword: current password mismatch', { stored: user.password, provided: oldPassword });
          return of(false);
        }
        return this.http.patch<User>(`${this.apiUrl}/${userId}`, { password: newPassword }).pipe(
          tap(u => {
            console.log('changePassword: password updated on server:', u);
            const current = this.userDataSubject.getValue();
            if (current) {
              this.userDataSubject.next({ ...current, password: newPassword });
            }
          }),
          switchMap(() => of(true)),
          catchError(err => {
            console.error('changePassword: PATCH failed', err);
            return of(false);
          })
        );
      }),
      catchError(err => {
        console.error('changePassword: GET failed', err);
        return of(false);
      })
    );
  }
}
