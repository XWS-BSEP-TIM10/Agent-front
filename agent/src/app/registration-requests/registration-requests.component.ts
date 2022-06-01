import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.scss']
})
export class RegistrationRequestsComponent implements OnInit {

  companies: any = [{
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis kompanije",
    emailUser: "user@gmail.com"
  },
  {
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis kompanije",
    emailUser: "user@gmail.com"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
