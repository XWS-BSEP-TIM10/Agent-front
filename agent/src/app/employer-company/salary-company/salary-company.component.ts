import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-company',
  templateUrl: './salary-company.component.html',
  styleUrls: ['./salary-company.component.scss']
})
export class SalaryCompanyComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
