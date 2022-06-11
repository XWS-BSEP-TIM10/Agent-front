import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-front-page-component',
  templateUrl: './front-page-component.component.html',
  styleUrls: ['./front-page-component.component.scss']
})
export class FrontPageComponentComponent implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
  }



  findPerson(){
    this.router.navigate(['search-users']);
  }

}
