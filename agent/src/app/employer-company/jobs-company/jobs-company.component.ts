import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewJobOfferDTO } from 'src/app/dto/NewJobOfferDTO';
import { JobOfferService } from 'src/app/service/job-offer.service';
import { EmployerCompanyComponent } from '../employer-company.component';

@Component({
  selector: 'app-jobs-company',
  templateUrl: './jobs-company.component.html',
  styleUrls: ['./jobs-company.component.scss']
})
export class JobsCompanyComponent implements OnInit {

  requirements: any = [];
  addingJob: boolean = false;
  isOwner: boolean | undefined;
  companyId: any;
  isSubmitted: boolean = false;

  jobOffers: any = [];

  addJobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    requirement: new FormControl('', Validators.required),
    dislinkt: new FormControl()
  })

  get f() { return this.addJobForm.controls; }

  constructor(private employerCompanyComponent: EmployerCompanyComponent, private route: ActivatedRoute, private jobOfferService: JobOfferService) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
    this.companyId = decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2])
    this.jobOfferService.getJobOffers(this.companyId).subscribe((data: any) => {
      this.jobOffers = data;
    })
  }

  addJob() {
    this.addingJob = true;
  }

  exitAddJob() {
    this.addingJob = false;
    this.requirements = [];
    this.addJobForm.get('requirement')?.setValue('');
  }

  addNewJob() {
    this.isSubmitted = true;
    if (this.addJobForm.invalid) {
      return
    }
    let newJobOfferDTO: NewJobOfferDTO = {
      title: this.addJobForm.get('title')?.value,
      position: this.addJobForm.get('position')?.value,
      description: this.addJobForm.get('description')?.value,
      requirements: this.requirements,
      companyId: this.companyId
    }


    this.jobOfferService.addJobOffer(newJobOfferDTO).subscribe((response: any) => {
      if (this.addJobForm.get('dislinkt')?.value) {

        this.jobOfferService.shareJobOffer(response.id).subscribe((response) => {

        },
          (error) => {
            alert("Api token not found!")
          })
      }
      this.addJobForm.get('title')?.setValue("")
      this.addJobForm.get('position')?.setValue("")
      this.addJobForm.get('description')?.setValue("")
      this.addJobForm.get('requirement')?.setValue("")
      this.addJobForm.get('dislinkt')?.setValue("")
      this.requirements = []
      
      this.jobOfferService.getJobOffers(this.companyId).subscribe((data: any) => {
        this.jobOffers = data;
      })

    },
    )




    this.addingJob = false;
    this.requirements = [];
    this.addJobForm.get('requirement')?.setValue('');
  }

  addRequirement() {
    this.requirements.push(this.addJobForm.get('requirement')?.value)
  }

  deleteRequirement(idx: number) {
    this.requirements.splice(idx, 1);
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
