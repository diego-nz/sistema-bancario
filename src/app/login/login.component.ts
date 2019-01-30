import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: any;
  private genericError: string;
  private loadingService: boolean;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService, private loginService: LoginService) {
    this.login = {email:'', password: ''};
    this.genericError = undefined;
    this.loadingService = false;
  }

  ngOnInit(){
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  doLogin(){
    const flag = this.validateLogin();
    if(flag){
      this.genericError = undefined;
      if(this.validateEmail()){
        this.callLoginService();
      } else {
        this.genericError = 'Correo inválido.';  
      }
    } else {
      this.genericError = 'Debes ingresar el usuario y la contraseña.';
    }
  }

  validateLogin(){
    if(this.login.email.trim() != '' && this.login.password.trim() != ''){
      return true;
    } else {
      return false;
    }
  }

  validateEmail(){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(this.login.email);
  }

  callLoginService(){
    document.querySelector('#login-btn').textContent = 'Cargando...';
    this.loadingService = true;
    this.loginService.serviceUserLogin(this.login).subscribe(
    (data: any)=>{
      console.log(data);
      this.genericError = undefined;
      this.loadingService = false;
      document.querySelector('#login-btn').textContent = 'Entrar';
    }, error => {
      console.log(error);
      this.genericError = 'Los datos ingresados son inválidos.';
      this.loadingService = false;
      document.querySelector('#login-btn').textContent = 'Entrar';
    });
  }
}
