import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsRoomCreateComponent } from './meetings-room-create.component';

describe('MeetingsRoomCreateComponent', () => {
  let component: MeetingsRoomCreateComponent;
  let fixture: ComponentFixture<MeetingsRoomCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsRoomCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsRoomCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
