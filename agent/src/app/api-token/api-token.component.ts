import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiTokenDTO } from '../dto/ApiTokenDTO';
import { StorageService } from '../service/storage.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-api-token',
  templateUrl: './api-token.component.html',
  styleUrls: ['./api-token.component.scss']
})
export class ApiTokenComponent implements OnInit {

  isSubmitted: boolean = false;

  tokenForm = new UntypedFormGroup({
    token: new UntypedFormControl('', [Validators.required])
  })

  get f() { return this.tokenForm.controls; }

  constructor(private tokenService: TokenService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }

  addToken() {
    this.isSubmitted = true;
    if (this.tokenForm.invalid) {
      return
    }
    let apiTokenDTO: ApiTokenDTO = {
      apiToken: this.tokenForm.get('token')?.value
    }

    this.tokenService.addToken(apiTokenDTO).subscribe((response) => {
      alert("Token saved successfully")
      this.router.navigateByUrl('/employer-company/' + this.storageService.getCompanyIdFromToken())
    },
      (error) => {
        alert("An error occurred... Please try again!")
      })
    this.tokenForm.get('token')?.setValue("")
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
