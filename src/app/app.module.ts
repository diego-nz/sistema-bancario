import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';
import { HomeComponent } from './home/home.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AuthGuard } from './guards/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
