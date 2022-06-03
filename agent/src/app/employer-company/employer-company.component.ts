import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../service/company.service';
import { StorageService } from '../service/storage.service';
import { RegisterCompanyDTO } from '../dto/RegisterCompanyDTO';
import { phoneNumberValidator } from '../validators/phoneNumber-validator';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.scss']
})

@Injectable()
export class EmployerCompanyComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    website: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator]),
    description: new FormControl('', [Validators.required]),
  })

  company: any = {}
  isOwner: boolean = false;
  isSubmitted = false;
  isApproved : boolean = true;
  ownCurrentCompany: boolean = false;

  constructor(private storageService: StorageService, private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    let id = decodeURI(this.route.snapshot.paramMap.get('id') || "")
    this.checkIfUserIsOwner(id)
    this.checkIfCompanyIsApproved(id)
    this.companyService.getCompanyById(id).subscribe((data: any) => {
      this.company = data;
    })
  }

  addCompany() : void{

    let registrationDTO: RegisterCompanyDTO = {
      email: this.registerForm.get('email')?.value,
      name: this.registerForm.get('name')?.value,
      address: this.registerForm.get('address')?.value,
      website:this.registerForm.get('website')?.value,
      phoneNumber:this.registerForm.get('phoneNumber')?.value,
      description:this.registerForm.get('description')?.value,
      ownerId: this.storageService.getIdFromToken()
    }


    this.companyService.addCompany(registrationDTO).subscribe((response) => {
      this.isApproved = false
    },
      )
  }

  get f() { return this.registerForm.controls; }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

  checkIfUserIsOwner(id: string) :void{
    if(id == '-1') this.isOwner= false
    else {
        if(id === this.storageService.getCompanyIdFromToken()){
          this.ownCurrentCompany = true;
        }else{
          this.ownCurrentCompany = false;
        }
        this.isOwner = true;
    }
  }

  checkIfCompanyIsApproved(id: string){
    if(this.storageService.getCompanyIdFromToken() !== "-1"){
      if(this.storageService.getRoleFromToken() === 'ROLE_USER') this.isApproved = false
      else this.isApproved = true
    }
  }

}
