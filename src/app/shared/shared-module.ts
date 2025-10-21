import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { SideMenuComponent } from './components/sideMenu/side-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { TabComponent } from './components/tab/tab.component';

const modules = [IonicModule, FormsModule, ReactiveFormsModule, RouterModule];
const components = [InputComponent, ButtonComponent, SelectComponent, SideMenuComponent, HeaderComponent, TabComponent]
@NgModule({
  declarations: [components],
  imports: [
    CommonModule, modules
  ],
  exports: [modules, components],
})
export class SharedModule { }
