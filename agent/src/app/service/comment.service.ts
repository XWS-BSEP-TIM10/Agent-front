import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from "src/shared";
import { NewCommentDTO } from '../dto/NewCommentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private addCommentUrl = "/reviews/"
  private getCommentsUrl = "/companies/"

  constructor(private http: HttpClient) { }

  addComment(newCommentDTO: NewCommentDTO) {
    return this.http.post(`${config.baseUrl}${this.addCommentUrl}`, newCommentDTO)
}

  getComments(id: string){
    return this.http.get(`${config.baseUrl}${this.getCommentsUrl}${id}/reviews/`)
  }
}
