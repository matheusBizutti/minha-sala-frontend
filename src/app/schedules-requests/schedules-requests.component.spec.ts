import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesRequestsComponent } from './schedules-requests.component';

describe('SchedulesRequestsComponent', () => {
  let component: SchedulesRequestsComponent;
  let fixture: ComponentFixture<SchedulesRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulesRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
