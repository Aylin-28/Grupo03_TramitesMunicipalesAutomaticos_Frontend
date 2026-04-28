import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputFieldIA } from './card-input-field-ia';

describe('CardInputFieldIA', () => {
  let component: CardInputFieldIA;
  let fixture: ComponentFixture<CardInputFieldIA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInputFieldIA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardInputFieldIA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
