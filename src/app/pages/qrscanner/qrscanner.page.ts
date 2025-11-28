import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Preferences } from '@capacitor/preferences';
import { IProduct } from '../../../interfaces/product.interface';
import googlePayPlugin from 'src/app/plugins/googlePayPlugin';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
  standalone: false,
})
export class QRscannerPage implements OnInit {

  scanResult = '';
  disabled = 'true';

  constructor(
    private modalCtrl: ModalController,
    private readonly platform: Platform
  ) { }

  async startScan() {
    const modal = await this.modalCtrl.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: true ,
    componentProps: {
      formats: [],
      lensFacing: LensFacing.Back
    }
    });

    await modal.present();

    const {data} = await modal.onWillDismiss();


    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }

    if (this.scanResult !== '') {
       this.disabled = 'false';

    }
  }

  ngOnInit() {
    if(this.platform.is('capacitor')){

      BarcodeScanner.isSupported().then();
      BarcodeScanner.requestPermissions();
    //  BarcodeScanner.removeAllListeners();
    }
  }

  async callPayPlugin(){

    const producto: IProduct = await JSON.parse(this.scanResult);

    if (producto) {


      await Preferences.set({
        key:'product',
        value: JSON.stringify ({
          description: producto.description,
          price: producto.price
        })
      })

      const resp = await googlePayPlugin.makePayment()
      console.log("LOOG FROM PLUGIN (ionic)", JSON.stringify(resp));

    }

  }

}
