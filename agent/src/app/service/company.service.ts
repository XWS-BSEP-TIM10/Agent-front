import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterCompanyDTO } from "../dto/RegisterCompanyDTO";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private unactiveCompaniesUrl = "/companies?activated=false"
    private CompanyUrl = "/companies/"
    private activeCompaniesUrl = "/companies?activated=true"


    constructor(private http: HttpClient) { }

    getUnactivatedCompanies(){
        return this.http.get(`${config.baseUrl}${this.unactiveCompaniesUrl}`)
    }

    activateCompany(companyId: string){
        return this.http.put(`${config.baseUrl}${this.CompanyUrl}${companyId}/activate`, {})
    }

    getActivatedCompanies(){
        return this.http.get(`${config.baseUrl}${this.activeCompaniesUrl}`)
    }

    addCompany(registrationDTO:RegisterCompanyDTO){
    return this.http.post(`${config.baseUrl}${this.CompanyUrl}`, registrationDTO)
    }

}
