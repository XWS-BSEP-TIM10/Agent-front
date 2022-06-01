import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCompanyComponent } from './comments-company.component';

describe('CommentsCompanyComponent', () => {
  let component: CommentsCompanyComponent;
  let fixture: ComponentFixture<CommentsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
