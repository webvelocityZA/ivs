import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InoculateComponent } from './inoculate.component';

describe('InoculateComponent', () => {
  let component: InoculateComponent;
  let fixture: ComponentFixture<InoculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InoculateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InoculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
