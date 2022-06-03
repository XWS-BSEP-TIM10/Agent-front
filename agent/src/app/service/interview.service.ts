import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "src/shared";
import {AddInterviewDTO} from './../dto/AddInterviewDTO'

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private companiesUrl = "/companies/"
  private addInterviewUrl = "/interviews"


  constructor(private http: HttpClient) { }

  getInterviews(id: string) {
    return this.http.get(`${config.baseUrl}${this.companiesUrl}${id}/interviews`)
  }

  addInterview(addInterviewDTO: AddInterviewDTO) {
    return this.http.post(`${config.baseUrl}${this.addInterviewUrl}`, addInterviewDTO)
  }
}
