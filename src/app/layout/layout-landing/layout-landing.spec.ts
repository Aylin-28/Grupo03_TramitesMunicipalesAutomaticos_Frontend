import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLanding } from './layout-landing';

describe('LayoutLanding', () => {
  let component: LayoutLanding;
  let fixture: ComponentFixture<LayoutLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutLanding],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutLanding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
