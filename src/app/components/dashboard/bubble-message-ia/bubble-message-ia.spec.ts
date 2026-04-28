import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleMessageIA } from './bubble-message-ia';

describe('BubbleMessageIA', () => {
  let component: BubbleMessageIA;
  let fixture: ComponentFixture<BubbleMessageIA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BubbleMessageIA],
    }).compileComponents();

    fixture = TestBed.createComponent(BubbleMessageIA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
