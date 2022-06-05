import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCompanyComponent } from './interview-company.component';

describe('InterviewCompanyComponent', () => {
  let component: InterviewCompanyComponent;
  let fixture: ComponentFixture<InterviewCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
