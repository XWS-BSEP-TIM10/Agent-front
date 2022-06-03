import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.scss']
})

@Injectable()
export class EmployerCompanyComponent implements OnInit {

  company: any = {
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis kompanije",
    rating: 5
  }
  isOwner: boolean = false;

  constructor(private storageService: StorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //if(this.storageService.getRoleFromToken() === 'ROLE_COMPANY_OWNER') this.isOwner =true
    let id = decodeURI(this.route.snapshot.paramMap.get('id') || "")
    if(id == '-1') this.isOwner= false
    else this.isOwner= true
  }

}
