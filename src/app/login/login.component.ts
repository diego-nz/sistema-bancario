import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: any;
  private genericError: string;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService) {
    this.login = {user:'', password: ''};
    this.genericError = undefined;
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
        console.log("ok");
      } else {
        this.genericError = 'Correo inválido.';  
      }
    } else {
      this.genericError = 'Debes ingresar el usuario y la contraseña.';
    }
  }

  validateLogin(){
    if(this.login.user.trim() != '' && this.login.password.trim() != ''){
      return true;
    } else {
      return false;
    }
  }

  validateEmail(){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(this.login.user);
  }
}
