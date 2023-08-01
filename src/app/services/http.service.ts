import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService {
  apiURL = environment.apiTickets + this.defineEnpoint();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  abstract defineEnpoint() : string;

  specifyEndpoint(endpoint){
    this.apiURL = this.apiURL.concat(endpoint);
  }

  get(method: string): Observable<any> {
    return this.http
      .get<any>(this.apiURL.concat(method));
  }

  post(record: any, method: string = ""): Observable<any>{
    console.log(this.apiURL);
    return this.http
      .post<any>(
        this.apiURL.concat(method),
        JSON.stringify(record),
        this.httpOptions
      );
  }
}
