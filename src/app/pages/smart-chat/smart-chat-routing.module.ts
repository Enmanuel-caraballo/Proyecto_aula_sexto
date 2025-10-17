import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartChatPage } from './smart-chat.page';

const routes: Routes = [
  {
    path: '',
    component: SmartChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartChatPageRoutingModule {}
