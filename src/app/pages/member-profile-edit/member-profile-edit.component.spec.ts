import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileEditComponent } from './member-profile-edit.component';

describe('MemberProfileEditComponent', () => {
  let component: MemberProfileEditComponent;
  let fixture: ComponentFixture<MemberProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
