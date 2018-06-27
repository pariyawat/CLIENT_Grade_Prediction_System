import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEmailComponent } from './teacher-email.component';

describe('TeacherEmailComponent', () => {
  let component: TeacherEmailComponent;
  let fixture: ComponentFixture<TeacherEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
