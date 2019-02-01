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
  private typeCards: Array<any>;
  private cardTypeSelected: any;
  private genericMessage: string;
  private arrayAccounts: Array<any>;
  private accountsMessage: string;

  constructor(private cookie: CookieService, private router: Router, 
    private homeService: HomeService) { 
    this.isCollapsed = true;
    this.cookieData = JSON.parse(this.cookie.get('decodedToken'));
    this.userName = {firstname: this.cookieData.firstname, lastname: this.cookieData.lastname};
    this.typeCards = [{type:'', name: ''}];
    this.cardTypeSelected = {type:'', name: ''};
    this.genericMessage = null;
    this.arrayAccounts = [];
    this.getCatalogsCallService();
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
        this.typeCards = data.response.type_cards;
      }, (error) => {
        this.genericMessage = 'Ocurrió un error al cargar el catálogo.';
      }
    );
  }

  requestCard(){
    if(this.validateCardSelection()){
      this.genericMessage = null;
      this.callRequestCardService();
    } else {
      this.genericMessage = 'Selecciona una opción válida.';
    }
  }

  validateCardSelection(): boolean{
    if(this.cardTypeSelected.type == ''){
      return false;
    }
    return true;
  }

  callRequestCardService(){
    this.homeService.requestCard(this.cardTypeSelected.type, this.cardTypeSelected.name).subscribe(
      (data: any) => {
        this.genericMessage = data.success;
        this.genericMessage = undefined;
      }, (error) => {
          this.genericMessage = 'Ocurrió un error al procesar la solicitud.';
      }
    );
  }

  callGetAccountsService(){
    this.homeService.getAccounts().subscribe(
      (data: any) => {
        this.arrayAccounts = data.response;
        this.accountsMessage = undefined;
      },(error) => {
        this.accountsMessage = 'Ocurrió un error al procesar tus cuentas.';
      }
    );
  }

}
