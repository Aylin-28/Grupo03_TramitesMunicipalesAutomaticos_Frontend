import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Documents } from './feedback';
import { AUTH_TOKEN } from '../../register/register';

describe('Documents', () => {
  let component: Documents;
  let fixture: ComponentFixture<Documents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Documents],
      providers: [{ provide: AUTH_TOKEN, useValue: { getToken: () => 'token' } }],
    }).compileComponents();

    fixture = TestBed.createComponent(Documents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter suggestions by the selected category', () => {
    component.fileRecords.set([
      {
        id: 1,
        title: 'Matrimonio',
        description: 'Primera sugerencia',
        points: 4,
        category_title: 'Matrimonio Civil',
        category_id: 1,
        date: '2024-01-01',
        tipo: 'matrimonio',
      },
      {
        id: 2,
        title: 'Nacimiento',
        description: 'Segunda sugerencia',
        points: 3,
        category_title: 'Actas de Nacimiento',
        category_id: 2,
        date: '2024-01-02',
        tipo: 'nacimiento',
      },
      {
        id: 3,
        title: 'Propiedad',
        description: 'Tercera sugerencia',
        points: 2,
        category_title: 'Bienes y Propiedades',
        category_id: 3,
        date: '2024-01-03',
        tipo: 'propiedad',
      },
    ]);

    component.setCategoryFilter(2);
    expect(component.filteredCards().map((file) => file.id)).toEqual([2]);

    component.setCategoryFilter(2);
    expect(component.filteredCards().map((file) => file.id)).toEqual([1, 2, 3]);
  });
});
