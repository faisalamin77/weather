import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) {}

  getForecast(location: string): Observable<any> {
    const url = `${environment.API_URL}?q=${location},uk&units=metric&appid=${environment.API_ID}`;
    return this.httpClient.get(url);
  }

  getLocations(): Observable<string[]> {
    return of(['London', 'Birmingham', 'Cardiff']);
  }
}
