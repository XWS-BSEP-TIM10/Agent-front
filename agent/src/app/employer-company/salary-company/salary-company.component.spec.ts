import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCompanyComponent } from './salary-company.component';

describe('SalaryCompanyComponent', () => {
  let component: SalaryCompanyComponent;
  let fixture: ComponentFixture<SalaryCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
