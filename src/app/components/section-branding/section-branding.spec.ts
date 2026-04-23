import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBranding } from './section-branding';

describe('SectionBranding', () => {
  let component: SectionBranding;
  let fixture: ComponentFixture<SectionBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionBranding],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionBranding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
