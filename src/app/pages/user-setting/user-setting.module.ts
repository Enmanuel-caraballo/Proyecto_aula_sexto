import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSettingPageRoutingModule } from './user-setting-routing.module';

import { UserSettingsPage } from './user-setting.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSettingPageRoutingModule,
    SharedModule
  ],
  declarations: [UserSettingsPage]
})
export class UserSettingPageModule {}
