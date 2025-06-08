import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMenFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/menFashion`);
  }

  getWomenFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/womenFashion`);
  }
  getRecommendedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommended`);
  }
  getSportsProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sports`);
  }
  getKidsFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/kids`);
  }
  getElectronicsProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/electronics`);
  }
  getBottomItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/startShopping`);
  }
  getTopItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/topItems`);
  }
  getOtherProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/other`);
  }

}
