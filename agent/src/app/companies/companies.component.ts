import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class CompaniesComponent implements OnInit {

  companies: any = [{
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Endava je tehnološka kompanija, sa preko 20 godina iskustva u radu sa nekim od vodećih svetskih kompanija u oblasti finansija,... kompanije",
    emailUser: "user@gmail.com",
    rating: 5
  },
  {
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis Endava je tehnološka kompanija, sa preko 20 godina iskustva u radu sa nekim od vodećih svetskih kompanija u oblasti finansija,...",
    emailUser: "user@gmail.com",
    rating: 5
  },
  {
    name : 'Kina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis Endava je tehnološka kompanija, sa preko 20 godina iskustva u radu sa nekim od vodećih svetskih kompanija u oblasti finansija,...",
    emailUser: "user@gmail.com",
    rating: 5
  },
  {
    name : 'Katarina',
    address: "Bulevar oslobodjenja 10, Novi Sad",
    website: "like.com",
    phoneNumber: "032/12332-123",
    email: "kljals@gmail.com",
    description: "Opis Endava je tehnološka kompanija, sa preko 20 godina iskustva u radu sa nekim od vodećih svetskih kompanija u oblasti finansija,...",
    emailUser: "user@gmail.com",
    rating: 3
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
