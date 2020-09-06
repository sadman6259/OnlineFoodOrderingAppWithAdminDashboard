import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationmodalComponent } from './notificationmodal.component';

describe('NotificationmodalComponent', () => {
  let component: NotificationmodalComponent;
  let fixture: ComponentFixture<NotificationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
