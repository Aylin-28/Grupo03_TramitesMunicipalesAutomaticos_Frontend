import { Component } from '@angular/core';
import { IconComponent } from '../../../components/ui/icon-component/icon-component';
import { InputField } from '../../../components/ui/input-field/input-field';
import { Button } from '../../../components/ui/button/button';
import { SettingSwitch } from '../../../components/dashboard/setting-switch/setting-switch';

@Component({
  selector: 'app-settings',
  imports: [IconComponent, InputField, Button, SettingSwitch],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {}
