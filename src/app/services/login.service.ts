import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  serviceUserLogin(body: any){
    const headers = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    console.log(this.API_URL+'authenticate');
    return this.http.post(this.API_URL+'authenticate',body,headers);
  }
}
