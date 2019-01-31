import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getCatalogs(){
    // const headers = new HttpHeaders({'Content-Type':  'application/json'});
    const params = new HttpParams();
    params.set('X-access-token', this.cookie.get('encodedToken'));
    return this.http.get(this.API_URL+'catalogs/cards',{params: params});
  }
}
