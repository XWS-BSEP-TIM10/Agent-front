import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  companyId: string = '-1'
  constructor(private router: Router, private storageService: StorageService) { }

  login(){
    this.router.navigate(['login']);
  }

  registration(){
    this.router.navigate(['registration']);
  }

  /*logout() {
    this.storageService.clearToken()
    this.router.navigate([''])
  }

  getRole() {
    return this.storageService.getRoleFromToken()
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }


  goToUsersPage() {
    let userId = this.storageService.getIdFromToken()
    this.router.navigate([`users/${userId}`])
  }*/

  ngOnInit(): void {
      //console.log(this.storageService.getCompanyIdFromToken())
      //this.companyId = this.storageService.getCompanyIdFromToken()
  }

  isAdmin(){
    return this.storageService.getRoleFromToken() === "ROLE_ADMIN"
  }

  isLoggedIn() {
    return this.storageService.getRoleFromToken() !== ""
  }

  logout() {
    this.storageService.clearToken()
    this.router.navigate([''])
  }

  changeRoute(){
    let compId: any = '/employer-company/'+this.storageService.getCompanyIdFromToken()
    this.router.navigate([compId]);
  }

}
