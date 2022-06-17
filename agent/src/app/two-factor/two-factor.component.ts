import { Component, OnInit } from '@angular/core';
import { TwoFADTO } from '../dto/TwoFADTO';
import { AuthenticationService } from '../service/authentication.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {

  constructor(private authService: AuthenticationService, private storageService: StorageService) { }

  secret = ""
  isChecked = false;

  ngOnInit(): void {
    this.authService.checkTwoFAStatus(this.storageService.getIdFromToken()).subscribe( (data: any) => {
      this.isChecked = data.enabled2FA
    }
  ) 
  }

  apply(): void {
    let twoFADTO: TwoFADTO = { enable2FA: this.isChecked, userId: this.storageService.getIdFromToken() };
    this.authService.sendEnableTwoFA(twoFADTO).subscribe( (data: any) => {
        this.secret = data.secret
      }
    ) 
  }

}
