import { Injectable } from '@angular/core';
import { config } from "src/shared"
import { HttpClient } from '@angular/common/http';
import { ApiTokenDTO } from '../dto/ApiTokenDTO';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokensUrl = "/api-tokens"


  constructor(private http: HttpClient) { }

  addToken(apiTokenDTO: ApiTokenDTO) {
    return this.http.post(`${config.baseUrl}${this.tokensUrl}`, apiTokenDTO)
  }

}
