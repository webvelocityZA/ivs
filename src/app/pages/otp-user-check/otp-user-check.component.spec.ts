import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpUserCheckComponent } from './otp-user-check.component';

describe('OtpUserCheckComponent', () => {
  let component: OtpUserCheckComponent;
  let fixture: ComponentFixture<OtpUserCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpUserCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpUserCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
