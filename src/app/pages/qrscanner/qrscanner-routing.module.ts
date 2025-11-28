import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRscannerPage } from './qrscanner.page';

const routes: Routes = [
  {
    path: '',
    component: QRscannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRscannerPageRoutingModule {}
