import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private login: any;
  private signin: any;
  private genericMessage: string;
  private genericSigninMessage: string;
  private loadingService: boolean;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService, 
    private loginService: LoginService, 
    private router: Router) {

    this.login = {email:'', password: ''};
    this.signin = {firstname: '', lastname: '', email: '', password: '', repeatPassword: ''};
    this.genericMessage = undefined;
    this.genericSigninMessage = undefined;
    this.loadingService = false;
  }

  ngOnInit(){
    if(this.loginService.isUserLoggedIn()){
        this.router.navigate(['/home']);
    }
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  doLogin(){
    const flag = this.validateLogin();
    if(flag){
      this.genericMessage = undefined;
      if(this.validateEmail(this.login.email)){
        this.callLoginService(this.login.email, this.login.password);
      } else {
        this.genericMessage = 'Correo inválido.';  
      }
    } else {
      this.genericMessage = 'Debes ingresar el usuario y la contraseña.';
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

  callLoginService(email: string, password: string){
    const body = {email: email, password : password}
    document.querySelector('#login-btn').textContent = 'Cargando...';
    this.loadingService = true;
    this.loginService.userLogin(body).subscribe(
    (data: any)=>{
      console.log(data.token);
      this.genericMessage = undefined;
      document.querySelector('#login-btn').textContent = 'Entrar';
      this.genericMessage = 'Login correcto.';
      this.loginService.jsonWebTokenDecode(data.token);
      setTimeout(() => {
        this.loadingService = false;
        this.router.navigate(['/home']);
      }, 900);
    }, (error: any) => {
      console.log(error);
      if(error.status == 404){
        this.genericMessage = 'Los datos ingresados son inválidos.';
      } else {
        this.genericMessage = 'Hubo un problema, favor de intentarlo más tarde.';
      }    
      this.loadingService = false;
      document.querySelector('#login-btn').textContent = 'Entrar';
    });
  }

  doSignin(){
    if(this.validateRegisterForm()){
        if(this.validateEmail(this.signin.email)){
          if(this.validatePasswords()){
              this.callSigninService();
          } else {
            this.genericSigninMessage = 'Las contraseñas no son coinciden.';
          }
        } else {
          this.genericSigninMessage = 'Correo inválido.';
        }
    } else {
      this.genericSigninMessage = 'Completa todos los campos.';
    }
  }

  validateRegisterForm(){
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
    this.loadingService = true;
    document.querySelector('#signin-btn').textContent = 'Registrando...';
    const body = {
      firstname: this.signin.firstname, 
      lastname: this.signin.lastname, 
      email: this.signin.email, 
      password: this.signin.password
    };
    this.loginService.userSignin(body).subscribe(
    (data: any)=>{
      console.log(data.success);
      this.genericSigninMessage = undefined;
      document.querySelector('#signin-btn').textContent = 'Registrarme';
      this.genericSigninMessage = 'Se ha registrado exitosamente.';
      this.callLoginService(body.email, body.password);
      setTimeout(() => {
        this.loadingService = false;
        this.resetModal();
      }, 800);
    }, (error: any) => {
      console.log(error.status);
      if(error.status == 403){
        this.genericSigninMessage = 'El correo ya ha sido registrado.';
      } else {
        this.genericSigninMessage = 'Hubo un problema, favor de intentarlo más tarde.';
      }
      this.loadingService = false;
      document.querySelector('#signin-btn').textContent = 'Registrarme';
    });
  }

  resetModal(){
      this.modalRef.hide();
      this.signin = {firstname: '', lastname: '', email: '', password: '', repeatPassword: ''};
  }

  sendLoginAfterSignin(){
    this.callLoginService(this.signin.email, this.signin.password);
  }
}
