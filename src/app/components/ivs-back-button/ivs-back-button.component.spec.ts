import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvsBackButtonComponent } from './ivs-back-button.component';

describe('IvsBackButtonComponent', () => {
  let component: IvsBackButtonComponent;
  let fixture: ComponentFixture<IvsBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvsBackButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvsBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
