import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSwitch } from './setting-switch';

describe('SettingSwitch', () => {
  let component: SettingSwitch;
  let fixture: ComponentFixture<SettingSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
