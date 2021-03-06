import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { EmployerCompanyComponent } from './employer-company/employer-company.component';
import { AboutCompanyComponent } from '../app/employer-company/about-company/about-company.component'
import { CommentsCompanyComponent } from '../app/employer-company/comments-company/comments-company.component'
import { InterviewCompanyComponent } from '../app/employer-company/interview-company/interview-company.component'
import { SalaryCompanyComponent } from '../app/employer-company/salary-company/salary-company.component'
import { RegistrationRequestsComponent } from '../app/registration-requests/registration-requests.component'
import { JobsCompanyComponent } from './employer-company/jobs-company/jobs-company.component';
import { CompaniesComponent } from './companies/companies.component';
import { ApiTokenComponent } from './api-token/api-token.component'
import { AdminGuard } from './auth-guards/admin.guard';
import { UserGuard } from './auth-guards/user.guard';
import { CompanyOwnerGuard } from './auth-guards/company-owner.guard';
import { AuthenticationGuard } from './auth-guards/authentication.guard';
import { AccountActivatedComponent } from './account-activated/account-activated.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { PasswordlessLoginComponent } from './passwordless-login/passwordless-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TwoFactorComponent } from './two-factor/two-factor.component';

const routes: Routes = [{ path: '', component: FrontPageComponentComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registration', component: RegistrationComponent },
{
  path: 'employer-company/:id', component: EmployerCompanyComponent, children:
    [
      { path: 'about-company', component: AboutCompanyComponent, outlet: 'company-details' },
      { path: 'comments-company', component: CommentsCompanyComponent, outlet: 'company-details' },
      { path: 'salary-company', component: SalaryCompanyComponent, outlet: 'company-details' },
      { path: 'jobs-company', component: JobsCompanyComponent, outlet: 'company-details' },
      { path: 'interview-company', component: InterviewCompanyComponent, outlet: 'company-details' }
    ]
},
{ path: 'registration-requests', component: RegistrationRequestsComponent,  canActivate:[AuthenticationGuard, AdminGuard] },
{ path: 'companies', component: CompaniesComponent },
{ path: 'api-token', component: ApiTokenComponent, canActivate:[AuthenticationGuard, CompanyOwnerGuard]},
{ path: 'confirm/:token', component: AccountActivatedComponent},
{ path: 'recover/:token', component: AccountRecoveryComponent},
{ path: 'login/password-less/:token', component: PasswordlessLoginComponent},
{ path: 'change-password', component: ChangePasswordComponent, canActivate:[AuthenticationGuard]},
{ path: 'two-factor', component: TwoFactorComponent, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard, AdminGuard, UserGuard, CompanyOwnerGuard]
})
export class AppRoutingModule { }
