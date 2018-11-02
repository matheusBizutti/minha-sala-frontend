import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesRequestsCreateComponent } from './schedules-requests-create.component';

describe('SchedulesRequestsCreateComponent', () => {
  let component: SchedulesRequestsCreateComponent;
  let fixture: ComponentFixture<SchedulesRequestsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesRequestsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesRequestsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
