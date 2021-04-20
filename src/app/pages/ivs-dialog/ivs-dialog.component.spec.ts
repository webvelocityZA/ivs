import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvsDialogComponent } from './ivs-dialog.component';

describe('IvsDialogComponent', () => {
  let component: IvsDialogComponent;
  let fixture: ComponentFixture<IvsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IvsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
