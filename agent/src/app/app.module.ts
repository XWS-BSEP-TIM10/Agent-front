import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';
import { EmployerCompanyComponent } from './employer-company/employer-company.component';
import { AboutCompanyComponent } from '../app/employer-company/about-company/about-company.component';
import { CommentsCompanyComponent } from '../app/employer-company/comments-company/comments-company.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FrontPageComponentComponent,
    LoginComponent,
    RegistrationComponent,
    UserPageComponent,
    EmployerCompanyComponent,
    AboutCompanyComponent,
    CommentsCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
