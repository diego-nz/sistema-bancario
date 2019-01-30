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
  private signin: any;
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
    this.signin = {firstname: '', lastname: '', email: '', password: '', repeatPassword: ''};
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
      if(this.validateEmail(this.login.email)){
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

  validateEmail(email: string){
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
  }

  callLoginService(){
    document.querySelector('#login-btn').textContent = 'Cargando...';
    this.loadingService = true;
    this.loginService.userLogin(this.login).subscribe(
    (data: any)=>{
      console.log(data.token);
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

  doSignin(){
    console.log(this.signin);
    if(this.validateRegisterForm()){
        if(this.validateEmail(this.signin.email)){
          if(this.validatePasswords()){
              console.log('Registrar con servicio');
              this.callSigninService();
          } else {
            console.log('Las contraseñas no son coinciden');
          }
        } else {
          console.log('Email inválido');
        }
    } else {
      console.log('Campos vacíos');
    }
  }

  validateRegisterForm(){
    console.log(this.signin);
    console.log(this.modalRef);
    if(this.signin.firstname.trim() != '' && this.signin.lastname.trim() != '' && this.signin.email.trim() != '' 
        && this.signin.password.trim() != '' && this.signin.repeatPassword.trim() != ''){
        return true;
    }
    else {
      return false;
    }
  }

  validatePasswords(){
    if(this.signin.password == this.signin.repeatPassword){
      return true;
    } else {
      return false;
    }
  }

  callSigninService(){
    const body = {
      firstname: this.signin.firstname, 
      lastname: this.signin.lastname, 
      email: this.signin.email, 
      password: this.signin.password
    };
    this.loginService.userSignin(body).subscribe(
    (data: any)=>{
      console.log(data.success);
    }, error => {
      console.log(error);
    });
  }
}
