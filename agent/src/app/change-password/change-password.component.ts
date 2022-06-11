import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { isContainsLowercase } from '../validators/isContainsLowercase-validator'
import { isContainsNumber } from '../validators/isContainsNumber-validator'
import { isContainsSymbol } from '../validators/isContainsSymbol-validator'
import { isContainsUppercase } from '../validators/isContainsUppercase-validator'
import { isValidLengthPassword } from '../validators/isValidLengthPassword-validator'
import { isWhitespace } from '../validators/isWhitespace-validator'
import { ActivatedRoute } from '@angular/router' 
import { ChangePasswordDTO } from '../dto/ChangePasswordDTO'
import { StorageService } from '../service/storage.service'
import * as zxcvbn from 'zxcvbn'

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isSubmitted = false;
  oldPasswordError = "";
  passwordError = "";
  confirmPasswordError = "";
  tokenValid = false;
  passwordStrength = "";
  strengthClass = "";

  constructor(private router: Router, private authService: AuthenticationService, private storageService: StorageService, private route: ActivatedRoute) { }

  recoveryForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, isContainsLowercase,
      isContainsNumber, isContainsSymbol, isContainsUppercase,
      isValidLengthPassword, isWhitespace]),
    repeatedNewPassword: new FormControl('', [Validators.required])
  })

  get f() { return this.recoveryForm.controls; }


  ngOnInit(): void {
  }

  checkPass() {
    let password = this.recoveryForm.get('newPassword');
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

  changePassword() {
    this.isSubmitted = true;
    this.oldPasswordError = "";
    this.passwordError = "";
    this.confirmPasswordError = "";

    if (this.recoveryForm.invalid) {
      return
    }
    
    var password = this.recoveryForm.get('newPassword')?.value;

    const result = zxcvbn(password);

    if (result.score != 3 && result.score != 4) {
      return
    }

    var repeatedPassword = this.recoveryForm.get('repeatedNewPassword')?.value;

    if (password != repeatedPassword) {
      this.confirmPasswordError = "The password conformation does not match";
      return
    }

    let changePasswordDTO: ChangePasswordDTO = {
      email: this.storageService.getEmailFromToken(),
      oldPassword: this.recoveryForm.get('oldPassword')?.value,
      newPassword: this.recoveryForm.get('newPassword')?.value,
      confirmPassword: this.recoveryForm.get('repeatedNewPassword')?.value
    }
    
    this.authService.changePassword(changePasswordDTO).subscribe((data: any) => {
      alert("Success")
      this.recoveryForm.get('oldPassword')?.setValue('')
      this.recoveryForm.get('newPassword')?.setValue('')
      this.recoveryForm.get('repeatedNewPassword')?.setValue('')
      this.router.navigateByUrl('/companies')
    }, (err: Error) => {
      this.oldPasswordError = "Wrong password!"
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
    return (value.invalid && value.touched)||(value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}

