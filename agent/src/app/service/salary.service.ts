import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "src/shared"
import {AddSalaryDTO} from './../dto/AddSalaryDTO'

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  
  private companiesUrl = "/companies/"
  private addSalaryUrl = "/salaries"


  constructor(private http: HttpClient) { }

  getSalaries(id: string) {
      return this.http.get(`${config.baseUrl}${this.companiesUrl}${id}/salaries`)
  }

  addSalary(addSalaryDTO: AddSalaryDTO) {
    return this.http.post(`${config.baseUrl}${this.addSalaryUrl}`, addSalaryDTO)
}

}
