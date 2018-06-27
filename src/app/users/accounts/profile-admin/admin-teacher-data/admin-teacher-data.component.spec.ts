import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherDataComponent } from './admin-teacher-data.component';

describe('AdminTeacherDataComponent', () => {
  let component: AdminTeacherDataComponent;
  let fixture: ComponentFixture<AdminTeacherDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTeacherDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
