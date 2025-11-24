import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCustomersComponent } from './key-customers.component';

describe('KeyCustomers', () => {
  let component: KeyCustomersComponent;
  let fixture: ComponentFixture<KeyCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
