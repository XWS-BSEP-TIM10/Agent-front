import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployerCompanyComponent } from '../employer-company.component';

@Component({
  selector: 'app-jobs-company',
  templateUrl: './jobs-company.component.html',
  styleUrls: ['./jobs-company.component.scss']
})
export class JobsCompanyComponent implements OnInit {

  requirements:any = [];
  addingJob: boolean = false;
  isOwner: boolean | undefined;

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

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    requirement: new FormControl('', Validators.required),
    dislinkt: new FormControl()
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
  }

  addJob(){
    this.addingJob = true;
  }

  exitAddJob(){
    this.addingJob = false;
    this.requirements = [];
    this.addJobForm.get('requirement')?.setValue('');
  }

  addNewJob(){
    this.addingJob = false;
    this.requirements = [];
    this.addJobForm.get('requirement')?.setValue('');
  }

  addRequirement(){
    this.requirements.push(this.addJobForm.get('requirement')?.value)
  }

  deleteRequirement(idx: number){
    this.requirements.splice(idx, 1);
  }

}
