import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouFeebackComponent } from './thank-you-feeback.component';

describe('ThankYouFeebackComponent', () => {
  let component: ThankYouFeebackComponent;
  let fixture: ComponentFixture<ThankYouFeebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouFeebackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYouFeebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
