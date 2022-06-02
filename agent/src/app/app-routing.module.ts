import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { UserPageComponent } from './user-page/user-page.component';
import {EmployerCompanyComponent} from './employer-company/employer-company.component';
import {AboutCompanyComponent} from '../app/employer-company/about-company/about-company.component'
import {CommentsCompanyComponent} from '../app/employer-company/comments-company/comments-company.component'
import {InterviewCompanyComponent} from '../app/employer-company/interview-company/interview-company.component'
import { SalaryCompanyComponent } from '../app/employer-company/salary-company/salary-company.component'
import { RegistrationRequestsComponent} from '../app/registration-requests/registration-requests.component'
import { JobsCompanyComponent } from './employer-company/jobs-company/jobs-company.component';
import { CompaniesComponent } from './companies/companies.component';

const routes: Routes = [{ path: '', component: FrontPageComponentComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'registration', component: RegistrationComponent },
                        { path:'users/:id', component: UserPageComponent},
                        { path: 'employer-company/:id', component: EmployerCompanyComponent, children:
                          [
                            { path: 'about-company',   component: AboutCompanyComponent, outlet:'company-details'},
                            { path: 'comments-company', component: CommentsCompanyComponent,  outlet: 'company-details'},
                            { path: 'salary-company', component: SalaryCompanyComponent,  outlet: 'company-details'},
                            { path: 'jobs-company', component: JobsCompanyComponent, outlet: 'company-details'},
                            { path: 'interview-company', component: InterviewCompanyComponent, outlet: 'company-details'}
                          ]
                        },
                        {path : 'registration-requests', component: RegistrationRequestsComponent},
                        {path : 'companies', component: CompaniesComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
