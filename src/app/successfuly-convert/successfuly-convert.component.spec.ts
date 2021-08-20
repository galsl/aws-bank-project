import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulyConvertComponent } from './successfuly-convert.component';

describe('SuccessfulyConvertComponent', () => {
  let component: SuccessfulyConvertComponent;
  let fixture: ComponentFixture<SuccessfulyConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulyConvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulyConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
