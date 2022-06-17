import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { RegistrationDTO } from '../dto/RegistrationDTO';
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import * as zxcvbn from 'zxcvbn'

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
  passwordStrength = "";
  strengthClass = "";
  sendRequest = false;
  gender = "";

  registerForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    confirmPassword: new UntypedFormControl('', [Validators.required])
  })

  ngOnInit(): void { /* ngOnInit is empty */ }

  get firstName() { return this.registerForm.get('firstName'); }
  get f() { return this.registerForm.controls; }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  checkPass() {
    let password = this.registerForm.get('password');
    if (!password?.valid) {
      this.passwordStrength = "";
      return
    }

    const result = zxcvbn(password?.value);
    let strength = "";
    switch (result.score) {
      case 0: { this.strengthClass = "alert alert-danger"; strength = "Worst"; break;}
      case 1: { this.strengthClass = "alert alert-danger"; strength = "Bad"; break;}
      case 2: {this.strengthClass = "alert alert-warning"; strength = "Weak"; break;}
      case 3: {this.strengthClass = "alert alert-info"; strength = "Good"; break;}
      default: {this.strengthClass = "alert alert-success"; strength = "Strong"; break;}
        
    }
    this.passwordStrength = "Strength: " + strength + " " + result.feedback.warning + ". " + result.feedback.suggestions;
  }

  registerUser() {
    if(this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value){
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    var password = this.registerForm.get('password')?.value;
    const result = zxcvbn(password);

    if (result.score != 3 && result.score != 4) {
      return
    }

    let registrationDTO: RegistrationDTO = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value
    }
    console.log(registrationDTO)

    this.authService.signup(registrationDTO).subscribe((_response) => {
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
