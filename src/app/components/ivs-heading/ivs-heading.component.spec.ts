import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvsHeadingComponent } from './ivs-heading.component';

describe('IvsHeadingComponent', () => {
  let component: IvsHeadingComponent;
  let fixture: ComponentFixture<IvsHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvsHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvsHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
