import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployerCompanyComponent } from '../employer-company.component';

@Component({
  selector: 'app-comments-company',
  templateUrl: './comments-company.component.html',
  styleUrls: ['./comments-company.component.scss'],
  styles: [`
    .star {
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #56baed;
    }
    .bad {
      color: #deb0b0;
    }
    .filled.bad {
      color: #ff1e1e;
    }
  `]
})
export class CommentsCompanyComponent implements OnInit {

  rating = 0

  addingComment : boolean = false;

  isOwner: boolean | undefined;

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

   comments: Review = [
    { id: 1, title: "Ram", positive: "Rokovi i ljudi su opusteni. Nema preterano posla, odobrio za ljude koji imaju iskustva i žele opušteniji radni dan ili dva posla istovremeno.", negative: "Loše mesto za učenje i napredak, dosta legacy projekata. Poprilično dosadan posao.", position: "Software Developer", rating: 3, creationDate: '6.6.2010.' },
    { id: 2, title: "Ram2", positive: "Dobre strane kompanije su, remote rad (bar trenutni), kompanija obezbedjuje svu opremu i vise nego sto je potrebno. Kompanija ima dobre klijente i intenzitet rada nije jak. Mislim da intenzitetet rada je i najveca prednost mada je i razumna jer endava nije tako jaka sa platama. Bezplatne beneficije, privatno zdravstveno, besplatan engleski i sve ono ostalo.  Takodje mislim da je kompanija idealna za pocetak karijere ili pocetak za radu u velikim timovima i velikom sistemu.", negative: "Negativno je to, sto se pominje povratak u kancelarije na hibridno radno vreme, takodje mozda malo manje plate od konkurenata, dosta sastanaka i birokratije (u smislu transparentnost mora biti velika zbog velicine timova).", position: "Software Developer", rating: 2, creationDate: '6.6.2012.'}
  ];

  addCommentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    positive: new FormControl('', Validators.required),
    negative: new FormControl('', Validators.required),
    rating: new FormControl()
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
  }

  addComment(){
    this.addingComment = true;
  }

  exitAddComment(){
    this.addingComment = false;
  }

}

type Review = Array<{ id: number; title: string; positive: string; negative: string; position: string; rating: number; creationDate: String }>;
