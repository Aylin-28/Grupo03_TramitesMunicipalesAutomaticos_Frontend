import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentroAyuda } from './centro-ayuda';

describe('CentroAyuda', () => {
  let component: CentroAyuda;
  let fixture: ComponentFixture<CentroAyuda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentroAyuda],
    }).compileComponents();

    fixture = TestBed.createComponent(CentroAyuda);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
