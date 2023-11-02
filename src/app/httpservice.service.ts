import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './model/interface';

@Injectable({
  providedIn: 'root',
})
export class HttpserviceService {
  constructor(private http: HttpClient) {}
  getAllData(): Observable<Data> {
    return this.http.get<Data>('https://api.artic.edu/api/v1/artworks?page=1');
  }

  getPaginatedData(page: string): Observable<Data> {
    return this.http.get<Data>(
      'https://api.artic.edu/api/v1/artworks?page=' + page
    );
  }
  getartData(id: string): Observable<any> {
    return this.http.get<any>('https://api.artic.edu/api/v1/artworks/' + id);
  }

  getDataBySearch(query: string): Observable<any> {
    return this.http.get<any>(
      'https://api.artic.edu/api/v1/artworks/search?q=' + query
    );
  }
  getAllDatasOfSearch(id: string): Observable<any> {
    return this.http.get<any>(
      'https://api.artic.edu/api/v1/artworks/?ids=' + id
    );
  }
}
