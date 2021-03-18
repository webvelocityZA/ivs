import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvsFooterComponent } from './ivs-footer.component';

describe('IvsFooterComponent', () => {
  let component: IvsFooterComponent;
  let fixture: ComponentFixture<IvsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
