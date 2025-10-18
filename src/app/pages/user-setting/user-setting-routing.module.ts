import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSettingsPage } from './user-setting.page';

const routes: Routes = [
  {
    path: '',
    component: UserSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingPageRoutingModule {}
