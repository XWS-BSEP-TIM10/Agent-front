import { config } from "src/shared"
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterCompanyDTO } from "../dto/RegisterCompanyDTO";
import { UpdateCompanyDTO } from "../dto/UpdateCompanyDTO";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    private unactiveCompaniesUrl = "/companies?activated=false"
    private companyUrl = "/companies/"
    private activeCompaniesUrl = "/companies?activated=true"


    constructor(private http: HttpClient) { }

    getUnactivatedCompanies() {
        return this.http.get(`${config.baseUrl}${this.unactiveCompaniesUrl}`)
    }

    activateCompany(companyId: string) {
        return this.http.put(`${config.baseUrl}${this.companyUrl}${companyId}/activate`, {})
    }

    deleteCompany(companyId: string) {
        return this.http.delete(`${config.baseUrl}${this.companyUrl}${companyId}/remove`)
    }

    getActivatedCompanies() {
        return this.http.get(`${config.baseUrl}${this.activeCompaniesUrl}`)
    }

    getCompanyById(id: string) {
        return this.http.get(`${config.baseUrl}${this.companyUrl}${id}`)
    }

    addCompany(registrationDTO: RegisterCompanyDTO) {
        return this.http.post(`${config.baseUrl}${this.companyUrl}`, registrationDTO)
    }

    updateCompany(updateDTO: UpdateCompanyDTO, id: string){
        return this.http.put(`${config.baseUrl}${this.companyUrl}${id}`, updateDTO)
    }
}
