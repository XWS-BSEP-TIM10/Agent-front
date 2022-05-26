import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FrontPageComponentComponent } from './front-page-component/front-page-component.component';
import { UserPageComponent } from './user-page/user-page.component';


const routes: Routes = [{ path: '', component: FrontPageComponentComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'registration', component: RegistrationComponent },
                        { path:'users/:id', component: UserPageComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
