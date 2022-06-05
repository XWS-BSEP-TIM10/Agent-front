import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCompanyComponent } from './employer-company.component';

describe('EmployerCompanyComponent', () => {
  let component: EmployerCompanyComponent;
  let fixture: ComponentFixture<EmployerCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
