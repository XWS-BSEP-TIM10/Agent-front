import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/users/login"
  private signupUrl = "/users/signup"
  private checkTokenUrl = "/auth/checkToken"
  private refreshTokenUrl = "/auth/refreshToken"

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    return this.http.post(`${config.baseUrl}${this.loginUrl}`, loginDTO)
  }

  signup(registrationDTO: RegistrationDTO) {
    return this.http.post(`${config.baseUrl}${this.signupUrl}`, registrationDTO)
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
