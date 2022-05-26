import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from "../dto/LoginDTO";
import { RegistrationDTO } from "../dto/RegistrationDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = "/auth/login"
  private signupUrl = "/auth/signup"
  private checkTokenUrl = "/auth/checkToken"
  private refreshTokenUrl = "/auth/refreshToken"

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO) {
    
  }

  signup(registrationDTO: RegistrationDTO) {
    
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
