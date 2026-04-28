import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPrivacity } from './alert-privacity';

describe('AlertPrivacity', () => {
  let component: AlertPrivacity;
  let fixture: ComponentFixture<AlertPrivacity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPrivacity],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPrivacity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
