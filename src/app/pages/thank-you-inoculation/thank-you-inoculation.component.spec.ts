import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouInoculationComponent } from './thank-you-inoculation.component';

describe('ThankYouInoculationComponent', () => {
  let component: ThankYouInoculationComponent;
  let fixture: ComponentFixture<ThankYouInoculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouInoculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouInoculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
