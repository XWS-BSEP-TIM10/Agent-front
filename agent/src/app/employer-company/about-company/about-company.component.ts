import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateCompanyDTO } from '../../dto/UpdateCompanyDTO';
import { CompanyService } from '../../service/company.service';
import { EmployerCompanyComponent } from '../employer-company.component';
import { StorageService } from '../../service/storage.service';
import { phoneNumberValidator } from '../../validators/phoneNumber-validator';

@Component({
  selector: 'app-about-company',
  templateUrl: './about-company.component.html',
  styleUrls: ['./about-company.component.scss']
})
export class AboutCompanyComponent implements OnInit {

  readOnlyForm: boolean = true;
  isOwner: boolean | undefined;
  isSubmitted = false;

  company: any = {}

  companyProfile = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, phoneNumberValidator]),
    website: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private employerCompanyComponent: EmployerCompanyComponent, private route: ActivatedRoute, private companyService: CompanyService, private storageService: StorageService) { }


  get f() { return this.companyProfile.controls; }

  ngOnInit(): void {
    let id = decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2])

    this.companyService.getCompanyById(id).subscribe((data: any) => {
      this.company = data;
      //this.company = this.employerCompanyComponent.company;
      this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
      this.companyProfile.get('name')?.setValue(this.company.name)
      this.companyProfile.get('address')?.setValue(this.company.address)
      this.companyProfile.get('email')?.setValue(this.company.email)
      this.companyProfile.get('phoneNumber')?.setValue(this.company.phoneNumber)
      this.companyProfile.get('website')?.setValue(this.company.website)
      this.companyProfile.get('description')?.setValue(this.company.description)
    })
  }

  enableEditing() {
    this.readOnlyForm = false;
  }

  saveChanges() {
    this.readOnlyForm = true;
    let updateDTO: UpdateCompanyDTO = {
      ownerId: this.storageService.getIdFromToken(),
      email: this.companyProfile.get('email')?.value,
      name: this.companyProfile.get('name')?.value,
      address: this.companyProfile.get('address')?.value,
      phoneNumber: this.companyProfile.get('phoneNumber')?.value,
      website: this.companyProfile.get('website')?.value,
      description: this.companyProfile.get('description')?.value
    }

    this.companyService.updateCompany(updateDTO, this.company.id).subscribe((response) => {
      this.ngOnInit();
      this.employerCompanyComponent.ngOnInit();
    },
      (error) => {
        alert("An error occurred... Please try again!")
        //this.company = this.employerCompanyComponent.company;
        this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
        this.companyProfile.get('name')?.setValue(this.company.name)
        this.companyProfile.get('address')?.setValue(this.company.address)
        this.companyProfile.get('email')?.setValue(this.company.email)
        this.companyProfile.get('phoneNumber')?.setValue(this.company.phoneNumber)
        this.companyProfile.get('website')?.setValue(this.company.website)
        this.companyProfile.get('description')?.setValue(this.company.description)
      })
  }


  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
