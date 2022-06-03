import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployerCompanyComponent } from '../employer-company.component';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.scss']
})
export class AboutCompanyComponent implements OnInit {

  readOnlyForm: boolean = true;
  isOwner: boolean | undefined;

  company: any = {}

  companyProfile = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent) { }

  ngOnInit(): void {
    this.company = this.employerCompanyComponent.company;
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
    this.companyProfile.get('name')?.setValue(this.company.name)
    this.companyProfile.get('address')?.setValue(this.company.address)
    this.companyProfile.get('email')?.setValue(this.company.email)
    this.companyProfile.get('phoneNumber')?.setValue(this.company.phoneNumber)
    this.companyProfile.get('website')?.setValue(this.company.website)
    this.companyProfile.get('description')?.setValue(this.company.description)
  }

  enableEditing(){
    this.readOnlyForm = false;
  }

  saveChanges(){
    this.readOnlyForm = true;
  }

}
