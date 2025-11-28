import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QrCodeComponent, QrCodeModule } from 'ng-qrcode';
import { QRscannerPageRoutingModule } from './qrscanner-routing.module';

import { QRscannerPage } from './qrscanner.page';
import { SharedModule } from "src/app/shared/shared-module";
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRscannerPageRoutingModule,
    QrCodeModule,
    SharedModule,
    BarcodeScanningModalComponent
],
  declarations: [QRscannerPage]
})
export class QRscannerPageModule {}
