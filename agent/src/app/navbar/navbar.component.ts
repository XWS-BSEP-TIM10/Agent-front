import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  companyId: number = -1
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
    //if(this.storageService.getRoleFromToken() !== "ROLE_COMPANY_OWNER")
    //  this.companyId = -1
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

}
