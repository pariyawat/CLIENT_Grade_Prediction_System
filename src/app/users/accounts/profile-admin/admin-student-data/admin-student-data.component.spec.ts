import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentDataComponent } from './admin-student-data.component';

describe('AdminStudentDataComponent', () => {
  let component: AdminStudentDataComponent;
  let fixture: ComponentFixture<AdminStudentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
