import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { InterviewCompanyComponent } from './employer-company/interview-company/interview-company.component';
import { SalaryCompanyComponent } from './employer-company/salary-company/salary-company.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { JobsCompanyComponent } from './employer-company/jobs-company/jobs-company.component';
import { CompaniesComponent } from './companies/companies.component';
import { ApiTokenComponent } from './api-token/api-token.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AccountActivatedComponent } from './account-activated/account-activated.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

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
    CommentsCompanyComponent,
    InterviewCompanyComponent,
    SalaryCompanyComponent,
    RegistrationRequestsComponent,
    JobsCompanyComponent,
    CompaniesComponent,
    ApiTokenComponent,
    AccountActivatedComponent,
    AccountRecoveryComponent,
    PasswordlessLoginComponent,
    ChangePasswordComponent,
    TwoFactorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    EmployerCompanyComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
