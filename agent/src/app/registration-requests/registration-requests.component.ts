import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class RegistrationRequestsComponent implements OnInit {

  companies: any = []

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies()
  }

  loadCompanies(){
    this.companyService.getUnactivatedCompanies().subscribe((data: any) => {
      this.companies = data;
    })
  }

  activateCompany(companyId: string) {
    this.companyService.activateCompany(companyId).subscribe((data: any) => {
      this.loadCompanies()
    }, (err: Error) => {
      alert('An error occured... Please try again!')
    })
  }

}
