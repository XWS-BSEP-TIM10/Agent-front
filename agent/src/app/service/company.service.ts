import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private unactiveCompaniesUrl = "/companies?activated=false"
    private activateCompanyUrl = "/companies/"

    constructor(private http: HttpClient) { }

    getUnactivatedCompanies(){
        return this.http.get(`${config.baseUrl}${this.unactiveCompaniesUrl}`)
    }

    activateCompany(companyId: string){
        return this.http.put(`${config.baseUrl}${this.activateCompanyUrl}${companyId}/activate`, {})
    }

}
