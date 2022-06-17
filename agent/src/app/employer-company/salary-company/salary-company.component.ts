import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { EmployerCompanyComponent } from '../employer-company.component';
import { SalaryService } from '../../service/salary.service';
import { ActivatedRoute } from '@angular/router';
import { AddSalaryDTO } from '../../dto/AddSalaryDTO';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-salary-company',
  templateUrl: './salary-company.component.html',
  styleUrls: ['./salary-company.component.scss']
})
export class SalaryCompanyComponent implements OnInit {

  salaryDiv: boolean = false;
  isOwner: boolean | undefined;
  isSubmitted: boolean = false;

  salaries: any = [];

  addSalaryForm = new UntypedFormGroup({
    position: new UntypedFormControl('', Validators.required),
    value: new UntypedFormControl('', Validators.required)
  })


  get f() { return this.addSalaryForm.controls; }

  constructor(private employerCompanyComponent: EmployerCompanyComponent, private salaryService: SalaryService, private route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
    let id = decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2])

    this.salaryService.getSalaries(id).subscribe((data: any) => {
      this.salaries = data;
    })
  }

  addSalary() {
    this.salaryDiv = true;
  }

  exitSalaryDiv() {
    this.salaryDiv = false;
  }

  addNewSalary() {
    
    this.isSubmitted = true;
    if (this.addSalaryForm.invalid) {
      return
    }
    let addSalaryDTO: AddSalaryDTO = {
      employeeId: this.storageService.getIdFromToken(),
      companyId: decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2]),
      value: this.addSalaryForm.get('value')?.value,
      position: this.addSalaryForm.get('position')?.value
    }

    this.salaryService.addSalary(addSalaryDTO).subscribe((_response) => {
      this.ngOnInit();
    },
      (_error) => {
        alert("An error occurred... Please try again!")
      })
    this.addSalaryForm.get('value')?.setValue("")
    this.addSalaryForm.get('position')?.setValue("")
    this.salaryDiv = false;

  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }


}
