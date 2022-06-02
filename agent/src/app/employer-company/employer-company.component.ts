import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-employer-company',
  templateUrl: './employer-company.component.html',
  styleUrls: ['./employer-company.component.scss']
})

@Injectable()
export class EmployerCompanyComponent implements OnInit {

  hasCompany: boolean = true;
  company: any = {
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis kompanije",
    rating: 5
  }
  isOwner: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
