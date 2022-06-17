import { Component, OnInit, Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormControl('', [Validators.required]),
    website: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    phoneNumber: new UntypedFormControl('', [Validators.required, phoneNumberValidator]),
    description: new UntypedFormControl('', [Validators.required]),
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
    this.checkIfCompanyIsApproved()
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


    this.companyService.addCompany(registrationDTO).subscribe((_response) => {
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

  checkIfCompanyIsApproved(){
    if(this.storageService.getCompanyIdFromToken() !== "-1"){
      if(this.storageService.getRoleFromToken() === 'ROLE_USER') this.isApproved = false
      else this.isApproved = true
    }
  }

}
