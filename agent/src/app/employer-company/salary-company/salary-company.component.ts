import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployerCompanyComponent } from '../employer-company.component';

@Component({
  selector: 'app-salary-company',
  templateUrl: './salary-company.component.html',
  styleUrls: ['./salary-company.component.scss']
})
export class SalaryCompanyComponent implements OnInit {

  salaryDiv: boolean = false;
  isOwner: boolean | undefined;

  salaries: any = [
    {
      value: 1200,
      position: 'Software developer (Medior)',
      users: 10,
      lowest: 1000,
      highest: 1500
    },
    {
      value: 700,
      position: 'Software developer (Junior)',
      users: 12,
      lowest: 600,
      highest: 800
    }
  ];

  addSalaryForm = new FormGroup({
    position: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  })


  constructor(private employerCompanyComponent:EmployerCompanyComponent) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.isOwner;
  }

  addSalary(){
    this.salaryDiv = true;
  }

  exitSalaryDiv(){
    this.salaryDiv = false;
  }

  addNewSalary(){
    this.salaryDiv = false;
  }

}
