import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isCollapsed: boolean;
  private userName: any;
  private cookieData: any;
  private type_cards: Array<any>;

  constructor(private cookie: CookieService, private router: Router, 
    private homeService: HomeService) { 
    this.isCollapsed = true;
    this.cookieData = JSON.parse(this.cookie.get('decodedToken'));
    this.userName = {firstname: this.cookieData.firstname, lastname: this.cookieData.lastname};
    this.type_cards = [];
  }

  ngOnInit() {
  }

  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

  getCatalogsCallService(){
    this.homeService.getCatalogs().subscribe(
      (data: any) => {
        this.type_cards = data.type_cards;
      }, (error) => {

      }
    );
  }

}
