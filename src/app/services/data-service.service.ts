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
    return this.http.get<any[]>(`${this.apiUrl}/Men`);
  }

  getWomenFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Women`);
  }
  getRecommendedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Recommended`);
  }
  getSportsProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Sports`);
  }
  getKidsFashionProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Kids`);
  }
  getElectronicsProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Electronics`);
  }
  getBottomItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Shopping`);
  }
  getTopItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/TopSales`);
  }
  getOtherProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Other`);
  }

}
