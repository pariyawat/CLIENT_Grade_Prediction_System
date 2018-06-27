import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddDataComponent } from './admin-add-data.component';

describe('AdminAddDataComponent', () => {
  let component: AdminAddDataComponent;
  let fixture: ComponentFixture<AdminAddDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
