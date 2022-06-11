import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";
import { NewPasswordDTO } from "../dto/NewPasswordDto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/auth/login"
  private signupUrl = "/users/signup"
  private acctivateAccountUrl = "/auth/confirm"
  private sendRecoveryEmailUrl = "/auth/recover"
  private changePasswordRecoveryUrl = "/auth/recover/changePassword"
  private checkTokenUrl = "/auth/checkToken"
  private refreshTokenUrl = "/auth/refreshToken"

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    return this.http.post(`${config.baseUrl}${this.loginUrl}`, loginDTO)
  }

  signup(registrationDTO: RegistrationDTO) {
    return this.http.post(`${config.baseUrl}${this.signupUrl}`, registrationDTO)
  }

  activateAccount(token: String) {
    return this.http.get(`${config.baseUrl}${this.acctivateAccountUrl}/${token}`)
  }

  sendRecoveryEmail(email: String) {
    return this.http.get(`${config.baseUrl}${this.sendRecoveryEmailUrl}?email=${email}`)
  }

  changePasswordRecovery(token: String, newPasswordDTO: NewPasswordDTO) {
    return this.http.put(`${config.baseUrl}${this.changePasswordRecoveryUrl}/${token}`, newPasswordDTO)
  }

  checkToken(token: String){
    return this.http.get(`${config.baseUrl}${this.checkTokenUrl}/${token}`)
  }

  refreshToken(refreshToken: any){
    const headers= new HttpHeaders()
  .set('Authorization', `Bearer ${refreshToken}`)
  .set('Anonymous', 'true')
    return this.http.get(`${config.baseUrl}${this.refreshTokenUrl}`, { 'headers': headers })
  }

}
