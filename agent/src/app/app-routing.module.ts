import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { UserPageComponent } from './user-page/user-page.component';
import {EmployerCompanyComponent} from './employer-company/employer-company.component';
import {AboutCompanyComponent} from './about-company/about-company.component'
import {CommentsCompanyComponent} from './comments-company/comments-company.component'

const routes: Routes = [{ path: '', component: FrontPageComponentComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'registration', component: RegistrationComponent },
                        { path:'users/:id', component: UserPageComponent},
                        { path: 'employer-company', component: EmployerCompanyComponent},
                        { path: 'about-company',  outlet:'company-details', component: AboutCompanyComponent},
                        { path: 'comments-company', outlet: 'company-details', component: CommentsCompanyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
