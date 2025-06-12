import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      // Assuming the response contains a token and user info
      map((res: any) => {
        if (res && res.user) {
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        }
        return res;
      })
    );
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }




logout() {
  localStorage.removeItem('currentUser');
}

isAdmin(): boolean {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user?.role === 'admin';
}


}
