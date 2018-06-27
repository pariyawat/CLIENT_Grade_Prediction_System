import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictResultComponent } from './predict-result.component';

describe('PredictResultComponent', () => {
  let component: PredictResultComponent;
  let fixture: ComponentFixture<PredictResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
