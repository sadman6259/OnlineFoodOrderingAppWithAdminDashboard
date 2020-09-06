import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuedetailschartComponent } from './menuedetailschart.component';

describe('MenuedetailschartComponent', () => {
  let component: MenuedetailschartComponent;
  let fixture: ComponentFixture<MenuedetailschartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuedetailschartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuedetailschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
