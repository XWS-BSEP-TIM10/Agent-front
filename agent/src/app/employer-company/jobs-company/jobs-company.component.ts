import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs-company',
  templateUrl: './jobs-company.component.html',
  styleUrls: ['./jobs-company.component.scss']
})
export class JobsCompanyComponent implements OnInit {

  jobOffers: any = [
    {
      title: "Experienced Java Developer",
      position: "Softvare developer",
      description: "Medior, Senior",
      requirements: ["Java"]
    },
    {
      title: "Medior Test Developer",
      position: "Test developer",
      description: "Medior, Senior",
      requirements: ["Bla", "Bla", "Bla"]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
