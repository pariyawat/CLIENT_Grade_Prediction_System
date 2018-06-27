import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPasswordComponent } from './student-password.component';

describe('StudentPasswordComponent', () => {
  let component: StudentPasswordComponent;
  let fixture: ComponentFixture<StudentPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
