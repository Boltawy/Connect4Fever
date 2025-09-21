import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BE_URL } from './multiplayer.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sayHelloWorld(): Observable<any> {
    return this.http.get(`${BE_URL}`);
  }
}
