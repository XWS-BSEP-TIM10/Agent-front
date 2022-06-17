import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";
import { NewPasswordDTO } from "../dto/NewPasswordDto";
import { ChangePasswordDTO } from "../dto/ChangePasswordDTO";
import { TwoFADTO } from "../dto/TwoFADTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/auth/login"
  private signupUrl = "/users/signup"
  private acctivateAccountUrl = "/auth/confirm"
  private sendRecoveryEmailUrl = "/auth/recover"
  private changePasswordRecoveryUrl = "/auth/recover/changePassword"
  private sendPasswordlessLoginEmailUrl = "/auth/password-less"
  private passwordlessLoginUrl = "/auth/login/password-less"
  private changePasswordUrl = "/users/change-password"
  private enableTwoFAUrl = "/auth/2fa"
  private checkTwoFAStatusUrl = "/auth/2fa/status"
  private checkTokenUrl = "/auth/checkToken"
  private refreshTokenUrl = "/auth/refreshToken"

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    return this.http.post(`${config.baseUrl}${this.loginUrl}`, loginDTO)
  }

  signup(registrationDTO: RegistrationDTO) {
    return this.http.post(`${config.baseUrl}${this.signupUrl}`, registrationDTO)
  }

  activateAccount(token: string) {
    return this.http.get(`${config.baseUrl}${this.acctivateAccountUrl}/${token}`)
  }

  sendRecoveryEmail(email: string) {
    return this.http.get(`${config.baseUrl}${this.sendRecoveryEmailUrl}?email=${email}`)
  }

  changePasswordRecovery(token: string, newPasswordDTO: NewPasswordDTO) {
    return this.http.put(`${config.baseUrl}${this.changePasswordRecoveryUrl}/${token}`, newPasswordDTO)
  }

  sendPasswordlessLoginEmail(email: string) {
    return this.http.get(`${config.baseUrl}${this.sendPasswordlessLoginEmailUrl}?email=${email}`)
  }

  passwordlessLogin(token: string){
    return this.http.get(`${config.baseUrl}${this.passwordlessLoginUrl}/${token}`)
  }

  changePassword(changePasswordDTO: ChangePasswordDTO) {
    return this.http.put(`${config.baseUrl}${this.changePasswordUrl}`, changePasswordDTO)
  }

  checkToken(token: string){
    return this.http.get(`${config.baseUrl}${this.checkTokenUrl}/${token}`)
  }

  sendEnableTwoFA(twoFADTO: TwoFADTO) {
    return this.http.put(`${config.baseUrl}${this.enableTwoFAUrl}`, twoFADTO)
  }

  checkTwoFAStatus(userId: string){
    return this.http.get(`${config.baseUrl}${this.checkTwoFAStatusUrl}/${userId}`)
  }

  refreshToken(refreshToken: any){
    const headers= new HttpHeaders()
  .set('Authorization', `Bearer ${refreshToken}`)
  .set('Anonymous', 'true')
    return this.http.get(`${config.baseUrl}${this.refreshTokenUrl}`, { 'headers': headers })
  }

}
