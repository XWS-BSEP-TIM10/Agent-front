import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/shared';
import { NewJobOfferDTO } from '../dto/NewJobOfferDTO';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  private JobOfferUrl = "/job-ads/"
  private getJobOfferUrl = "/companies/"

  constructor(private http: HttpClient) { }

  addJobOffer(newJobOfferDTO: NewJobOfferDTO) {
    return this.http.post(`${config.baseUrl}${this.JobOfferUrl}`, newJobOfferDTO)
  }

  getJobOffers(id: string) {
    return this.http.get(`${config.baseUrl}${this.getJobOfferUrl}${id}/job-ads/`)
  }

  shareJobOffer(id: string){
    return this.http.post(`${config.baseUrl}${this.JobOfferUrl}${id}`,{})
  }
}
