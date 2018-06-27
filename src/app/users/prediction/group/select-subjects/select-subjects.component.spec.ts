import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubjectsComponent } from './select-subjects.component';

describe('SelectSubjectsComponent', () => {
  let component: SelectSubjectsComponent;
  let fixture: ComponentFixture<SelectSubjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
