import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartChatPageRoutingModule } from './smart-chat-routing.module';

import { SmartChatPage } from './smart-chat.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartChatPageRoutingModule,
    SharedModule
],
  declarations: [SmartChatPage]
})
export class SmartChatPageModule {}
