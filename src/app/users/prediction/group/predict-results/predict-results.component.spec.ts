import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictResultsComponent } from './predict-results.component';

describe('PredictResultsComponent', () => {
  let component: PredictResultsComponent;
  let fixture: ComponentFixture<PredictResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
