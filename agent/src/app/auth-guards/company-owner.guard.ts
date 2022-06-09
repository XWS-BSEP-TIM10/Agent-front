import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../service/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyOwnerGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storageService.getRoleFromToken() === 'ROLE_COMPANY_OWNER')
      return true
    this.router.navigate(['/']);
    return false
  }


}
