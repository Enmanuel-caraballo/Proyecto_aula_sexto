import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/providers/auth/auth';

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

}
