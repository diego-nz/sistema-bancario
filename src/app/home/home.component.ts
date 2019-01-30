import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private isCollapsed: boolean;
  constructor(private cookie: CookieService, private router: Router) { 
    this.isCollapsed = true;
   }

  ngOnInit() {
  }

  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['/']);
  }

}
