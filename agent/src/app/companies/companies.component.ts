import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class CompaniesComponent implements OnInit {

  companies: any = []

  constructor(private storageService: StorageService, private companyService:CompanyService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(){
    this.companyService.getActivatedCompanies().subscribe((data: any) => {
      this.companies = data;
    })
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }

}
