import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupManageComponent } from './admin-group-manage.component';

describe('AdminGroupManageComponent', () => {
  let component: AdminGroupManageComponent;
  let fixture: ComponentFixture<AdminGroupManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
