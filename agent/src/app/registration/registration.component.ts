import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RegistrationDTO } from '../dto/RegistrationDTO';
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import { phoneNumberValidator } from '../validators/phoneNumber-validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  isSubmitted = false;
  responseError = "";
  passwordError = "";
  confirmPasswordError = "";
  sendRequest = false;
  gender = "";

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  get firstName() { return this.registerForm.get('firstName'); }
  get f() { return this.registerForm.controls; }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }


  registerUser() {
    if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value){
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    let registrationDTO: RegistrationDTO = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }

    this.authService.signup(registrationDTO).subscribe((response) => {
      this.router.navigateByUrl('/')
    },
      (error) => {
        this.sendRequest = false;
        if (error.status == 400) {
            this.responseError = 'Username already exists.'
        } else if (error.status == 500) {
          this.responseError = 'An error occurred, please try again.'
        }
      })
  }

  togglePass(id: string, toggleId: string) {
    var x = (document.getElementById(id) as HTMLInputElement);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

    const elem = document.querySelector('#' + toggleId) as HTMLElement;
    elem.classList.toggle('bi-eye');
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }



}
