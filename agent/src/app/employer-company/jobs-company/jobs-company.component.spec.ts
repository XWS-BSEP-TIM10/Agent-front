import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCompanyComponent } from './jobs-company.component';

describe('JobsCompanyComponent', () => {
  let component: JobsCompanyComponent;
  let fixture: ComponentFixture<JobsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
