import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private baseUrl = 'http://localhost:3000'; 

  private endpoints = [
    'Shopping',
    'Other',
    'Kids',
    'Sports',
    'Men',
    'Women',
    'Electronics',
    'Recommended',
    'TopSales'
  ];

  constructor(private http: HttpClient) { }

  private getAllData(): Observable<{ [key: string]: any[] }> {
    const requests = this.endpoints.map(ep => this.http.get<any[]>(`${this.baseUrl}/${ep}`));

    return forkJoin(requests).pipe(
      map(responses => {
        const result: { [key: string]: any[] } = {};
        responses.forEach((data, i) => {
          result[this.endpoints[i]] = data;
        });
        return result;
      })
    );
  }

  search(term: string): Observable<{ [key: string]: any[] }> {
    const lowerTerm = term.toLowerCase();

    return this.getAllData().pipe(
      map(data => {
        const filteredResult: { [key: string]: any[] } = {};

        for (const category in data) {
          filteredResult[category] = data[category].filter(item => {
            return Object.values(item).some(val =>
              typeof val === 'string' && val.toLowerCase().includes(lowerTerm)
            );
          });
        }

        return filteredResult;
      })
    );
  }
}
