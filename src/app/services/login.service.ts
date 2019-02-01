import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient, private cookie: CookieService) { }

  userLogin(body: any){
    const headers = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    return this.http.post(this.API_URL+'/auth/user/authenticate',body,headers);
  }

  userSignin(body: any){
    const headers = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    console.log(body);
    return this.http.post(this.API_URL+'/auth/user/create',body,headers);
  }

  jsonWebTokenDecode(token: string){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.cookie.set('decodedToken', JSON.stringify(decodedToken));
    this.cookie.set('encodedToken',token);
    console.log('Token',token);
    console.log('TokenDecoded',decodedToken);
  }
  
  isUserLoggedIn(): boolean{
    if(this.cookie.get('decodedToken') && this.cookie.get('encodedToken')){
      return true;
    }
    return false;
  }
}
