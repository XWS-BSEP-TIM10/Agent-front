import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoginDTO } from '../dto/LoginDTO';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  forgottenPassword: boolean = false;
  passwordless: boolean = false;
  signInError = "";

  constructor(private authService: AuthenticationService, private storageService: StorageService, private router: Router) { }

  emailRecoveryForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  get f() { return this.emailRecoveryForm.controls; }

  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  loginUser(credentials: NgForm) {
    this.signInError = ""
    let loginDTO: LoginDTO = { email: credentials.value.email, password: credentials.value.password };
    this.authService.login(loginDTO).subscribe((data: any) => {
      this.storageService.storeTokenData(data.jwt, data.refreshToken);
      switch (this.storageService.getRoleFromToken()) {
        case 'ROLE_USER':
          this.router.navigateByUrl('/companies')
          break
        case 'ROLE_COMPANY_OWNER':
          this.router.navigateByUrl('/employer-company/1')
          break;
        case 'ROLE_ADMIN':
          this.router.navigateByUrl('/registration-requests')
          break;
      }
    }, (err: Error) => {
      this.signInError = "Oops! The username and password combination is incorrect. Please try again!"
    })
  }

  forgotPassword() {
    this.forgottenPassword = true;
    this.passwordless = false;
  }

  passwordlessLogin() {
    this.passwordless = true;
    this.forgottenPassword = false;
  }

  sendRecoveryMail() {
    this.isSubmitted = true;
  }

  sendPasswordlessEmail() {
    this.isSubmitted = true;
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }
}
