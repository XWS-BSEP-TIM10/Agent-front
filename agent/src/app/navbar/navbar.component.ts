import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { EmployerCompanyComponent } from '../employer-company/employer-company.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  companyId: string = '-1'
  constructor(private router: Router, private storageService: StorageService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  login() {
    this.router.navigate(['login']);
  }

  registration() {
    this.router.navigate(['registration']);
  }

  ngOnInit(): void {
    //console.log(this.storageService.getCompanyIdFromToken())
    //this.companyId = this.storageService.getCompanyIdFromToken()
  }

  isAdmin() {
    return this.storageService.getRoleFromToken() === "ROLE_ADMIN"
  }

  isOwner() {
    return this.storageService.getRoleFromToken() === "ROLE_COMPANY_OWNER"
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }

  logout() {
    this.storageService.clearToken()
    this.router.navigate([''])
  }

  changeRoute() {
    let compId: any = '/employer-company/' + this.storageService.getCompanyIdFromToken()
    this.router.navigate([compId]);
  }

}
