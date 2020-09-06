import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersreportComponent } from './customersreport.component';

describe('CustomersreportComponent', () => {
  let component: CustomersreportComponent;
  let fixture: ComponentFixture<CustomersreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
