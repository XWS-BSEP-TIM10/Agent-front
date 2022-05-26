import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

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
  }

}
