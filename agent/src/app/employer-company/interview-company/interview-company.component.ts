import { Component, OnInit } from '@angular/core';
import { EmployerCompanyComponent } from '../employer-company.component';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { InterviewService } from './../../service/interview.service'
import { ActivatedRoute } from '@angular/router';
import { AddInterviewDTO } from '../../dto/AddInterviewDTO';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-interview-company',
  templateUrl: './interview-company.component.html',
  styleUrls: ['./interview-company.component.scss']
})
export class InterviewCompanyComponent implements OnInit {

  rating = 0
  isOwner: boolean | undefined;
  interviewDiv: boolean = false;
  /* comment: any = {
     id : '1',
     title: "Bulevar oslobodjenja 10, Novi Sad",
     positive: "like.com",
     negative: "032/12332-123",
     position: "Developer",
     rating: 3,
     creationDate: "7.6.2010."
   }
 
    comments: Array<Comment>*/

  isSubmitted: boolean = false;
  interviewComments: InterviewReview = [];

  get f() { return this.addInterviewForm.controls; }

  addInterviewForm = new UntypedFormGroup({
    position: new UntypedFormControl('', Validators.required),
    title: new UntypedFormControl('', Validators.required),
    hr: new UntypedFormControl('', Validators.required),
    tech: new UntypedFormControl('', Validators.required)
  })

  constructor(private storageService: StorageService, private employerCompanyComponent: EmployerCompanyComponent, private interviewService: InterviewService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
    let id = decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2])

    this.interviewService.getInterviews(id).subscribe((data: any) => {
      this.interviewComments = data;
    })
  }

  addInterview() {
    this.interviewDiv = true;
  }

  exitInterviewDiv() {
    this.interviewDiv = false;
  }

  addNewInterview() {
    this.isSubmitted = true;
    if (this.addInterviewForm.invalid) {
      return
    }
    let addInterviewDTO: AddInterviewDTO = {
      candidateId: this.storageService.getIdFromToken(),
      companyId: decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2]),
      title: this.addInterviewForm.get('title')?.value,
      hrInterview: this.addInterviewForm.get('hr')?.value,
      techInterview: this.addInterviewForm.get('tech')?.value,
      position: this.addInterviewForm.get('position')?.value
    }

    console.log(addInterviewDTO)
    this.interviewService.addInterview(addInterviewDTO).subscribe((response) => {
      this.ngOnInit();
    },
      (error) => {
        alert("An error occurred... Please try again!")
      })
    this.addInterviewForm.get('title')?.setValue("")
    this.addInterviewForm.get('hr')?.setValue("")
    this.addInterviewForm.get('tech')?.setValue("")
    this.addInterviewForm.get('position')?.setValue("")
    this.interviewDiv = false;
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}

type InterviewReview = Array<{ id: number; title: string; hrInterview: string; techInterview: string; position: string; rating: number; creationDate: String }>;