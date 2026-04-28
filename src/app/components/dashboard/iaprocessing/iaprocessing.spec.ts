import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAProcessing } from './iaprocessing';

describe('IAProcessing', () => {
  let component: IAProcessing;
  let fixture: ComponentFixture<IAProcessing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAProcessing],
    }).compileComponents();

    fixture = TestBed.createComponent(IAProcessing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
