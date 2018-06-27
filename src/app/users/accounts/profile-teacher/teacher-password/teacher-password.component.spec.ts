import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPasswordComponent } from './teacher-password.component';

describe('TeacherPasswordComponent', () => {
  let component: TeacherPasswordComponent;
  let fixture: ComponentFixture<TeacherPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
