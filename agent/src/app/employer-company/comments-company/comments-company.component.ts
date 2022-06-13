import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  isSubmitted = false;
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

  addCommentForm = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    position: new UntypedFormControl('', Validators.required),
    positive: new UntypedFormControl('', Validators.required),
    negative: new UntypedFormControl('', Validators.required),
    rating: new UntypedFormControl()
  })

  constructor(private employerCompanyComponent:EmployerCompanyComponent, private storageService:StorageService, private route: ActivatedRoute, private commentService:CommentService) { }

  get f() { return this.addCommentForm.controls; }

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
    this.isSubmitted = true;
    if (this.addCommentForm.invalid) {
      return
    }

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
        this.commentService.getComments(this.companyId).subscribe((data: any) => {
          this.comments = data;
          this.addingComment = false;
        })
    },
      )
  }

  isValid(value: any): boolean {
    return (value.invalid && value.touched) || (value.dirty && value.invalid) ||
      (value.untouched && this.isSubmitted);
  }

}
