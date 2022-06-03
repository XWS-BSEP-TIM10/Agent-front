import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewCommentDTO } from 'src/app/dto/NewCommentDTO';
import { CommentService } from 'src/app/service/comment.service';
import { StorageService } from 'src/app/service/storage.service';
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

  companyId: any;

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

   comments: any;

  addCommentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    positive: new FormControl('', Validators.required),
    negative: new FormControl('', Validators.required),
    rating: new FormControl()
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent, private storageService:StorageService, private route: ActivatedRoute, private commentService:CommentService) { }

  ngOnInit(): void {
    this.isOwner = this.employerCompanyComponent.ownCurrentCompany;
    this.companyId = decodeURI(this.route.snapshot.paramMap.get('id') || window.location.pathname.split("/")[2])
    this.commentService.getComments(this.companyId).subscribe((data: any) => {
      this.comments = data;
    })
  }

  addComment(){
    this.addingComment = true;
  }

  exitAddComment(){
    this.addingComment = false;
  }

  addNewComment() : void{

    let newCommentDTO: NewCommentDTO = {
      title: this.addCommentForm.get('title')?.value,
      positive: this.addCommentForm.get('positive')?.value,
      negative: this.addCommentForm.get('negative')?.value,
      position: this.addCommentForm.get('position')?.value,
      rating: this.addCommentForm.get('rating')?.value,
      reviewerId: this.storageService.getIdFromToken(),
      companyId: this.companyId
    }


    this.commentService.addComment(newCommentDTO).subscribe((response) => {
        alert("You've successfully left a comment.")
        this.commentService.getComments(this.companyId).subscribe((data: any) => {
          this.comments = data;
          this.addingComment = false;
        })
    },
      )
  }

}

type Review = Array<{ id: number; title: string; positive: string; negative: string; position: string; rating: number; creationDate: String }>;
