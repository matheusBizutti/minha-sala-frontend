import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsRoomComponent } from './meetings-room.component';

describe('MeetingsRoomComponent', () => {
  let component: MeetingsRoomComponent;
  let fixture: ComponentFixture<MeetingsRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
