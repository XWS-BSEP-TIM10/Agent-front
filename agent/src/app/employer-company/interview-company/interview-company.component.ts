import { Component, OnInit } from '@angular/core';
import { EmployerCompanyComponent } from '../employer-company.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
 
    interviewComments: InterviewReview = [
     { id: 1, title: "Ram", hrInterview: "HR intervju je trajao sat vremena, sa dvoje ljudi iz HR-a. Razgovor je bio veoma prijatan i opušten, ragovarali smo o raznim temema, a naravno najviše o mom prethodnom iskustvu. Intervju je bio na srpskom, ali smo par minuta pričali na engleskom. Intervju je bio online i sa upaljenim kamerama.", techInterview: "Tehnički intervju je trajao sat vremena. Intervju su vodila dvojica inženjera. Pitali su me neke stvari o mom prethodnom iskustvu, ali samo ukratko. Onda je nastupilo ispitivanje. Dosta toga smo prošli što se tiče C++a, od osnovnih stvari do naprednijih stvari. Radili smo preko neke online platforme za interaktivno editovanje koda. Nisam radio nikakav konkretan zadatak, nego samo sam davao neke kratke primjere za to što pričam. Ispitivali su me i o strukturama podataka i design patternima. Bili su veoma korektni i prijatni, čak su mi se i izvinjavali što će me pitati osnovne stvari.", position: "Software Developer", rating: 5, creationDate: '6.6.2010.' },
     { id: 2, title: "Ram2", hrInterview: "Veoma pozitivan i prijatan razgovor, opustena atmosfera, prijatni ljudi. Postavili mi konkretna pitanja, dali vremena da ispricam, videlo se da su pazljivo slusali i postavljali potpitanja da bi razumeli moj prethodni angazman i moje motive i karijerne ciljeve. Naravno, engleski jezik kao provera, sto se podrazumeva. ", techInterview: "Prosli smo kroz agendu koja mi je prethodno bila dostavljena da se pripremim. Nije bilo iznenadjenja, takodje dosta prijatan razgovor. Pitanja o prethodnom radnom iskustvu i konkretnim primerima, zatim teorija i ostalo je vremena za dodatna pitanja. Sve je bilo na mestu i bez stresa.", position: "Agile Delivery Manager", rating: 5, creationDate: '6.6.2012.'}
   ];

   addInterviewForm = new FormGroup({
    position: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    hr: new FormControl('', Validators.required),
    tech: new FormControl('', Validators.required)
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.isOwner;
  }

  addInterview(){
    this.interviewDiv = true;
  }

  exitInterviewDiv(){
    this.interviewDiv = false;
  }

  addNewInterview(){
    this.interviewDiv = false;
  }

}

type InterviewReview = Array<{ id: number; title: string; hrInterview: string; techInterview: string; position: string; rating: number; creationDate: String }>;