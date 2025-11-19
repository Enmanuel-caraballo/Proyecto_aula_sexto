import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/providers/auth/auth';
import googlePayPlugin from 'src/app/plugins/googlePayPlugin';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  standalone: false,
})
export class TabComponent  implements OnInit {

  constructor(private readonly authSrv: Auth) { }

  ngOnInit() {}

  verify(){
   this.authSrv.getCurrentUser();
  }


  async callPayPlugin(){
    try {
     const resp = await googlePayPlugin.execute({
      uuid: "Prueba plugin"
     });
     console.log('Plugin Ionic', JSON.stringify(resp));

    } catch (error) {
      console.log('Err llamada del plugin', error);

    }
  }
}
