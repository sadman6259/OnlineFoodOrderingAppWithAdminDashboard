import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningByItemsComponent } from './earning-by-items.component';

describe('EarningByItemsComponent', () => {
  let component: EarningByItemsComponent;
  let fixture: ComponentFixture<EarningByItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningByItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningByItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
