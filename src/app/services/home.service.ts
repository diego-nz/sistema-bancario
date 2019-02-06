import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getCatalogs(){
    const headers = new HttpHeaders({'X-access-token': this.cookie.get('encodedToken'), 'Content-Type':  'application/json'});
    return this.http.get(this.API_URL + '/catalogs/cards',{headers: headers});
  }

  requestCard(type: string, name: string){
    const id = JSON.parse(this.cookie.get('decodedToken'));
    const body = {userId: id.id, type: type, name: name};
    const headers = {headers: new HttpHeaders({'Content-Type':  'application/json', 'X-access-token': this.cookie.get('encodedToken')})};
    return this.http.post(this.API_URL + '/accounts', body , headers);
  }

  getAccounts(){
    const headers = new HttpHeaders({'X-access-token': this.cookie.get('encodedToken'), 'Content-Type':  'application/json'});
    return this.http.get(this.API_URL + '/accounts',{headers: headers});
  }
}
