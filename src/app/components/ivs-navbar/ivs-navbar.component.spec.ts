import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvsNavbarComponent } from './ivs-navbar.component';

describe('IvsNavbarComponent', () => {
  let component: IvsNavbarComponent;
  let fixture: ComponentFixture<IvsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
