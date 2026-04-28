import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDownloadIA } from './card-download-ia';

describe('CardDownloadIA', () => {
  let component: CardDownloadIA;
  let fixture: ComponentFixture<CardDownloadIA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDownloadIA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDownloadIA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
