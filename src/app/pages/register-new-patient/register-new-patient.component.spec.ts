import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewPatientComponent } from './register-new-patient.component';

describe('RegisterNewPatientComponent', () => {
  let component: RegisterNewPatientComponent;
  let fixture: ComponentFixture<RegisterNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNewPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
