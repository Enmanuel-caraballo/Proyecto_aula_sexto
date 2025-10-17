import { Component, OnInit } from '@angular/core';
import { Crud } from 'src/app/core/providers/crudFireBase/crud';
import { GlobalItems } from '../../core/providers/global/global-items';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserCreate } from 'src/app/interfaces/user.interface';
import { Auth } from 'src/app/core/providers/auth/auth';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.page.html',
  styleUrls: ['./user-settings.page.scss'],
  standalone: false,
})
export class UserSettingsPage implements OnInit {

  name!: FormControl;
  lastName!: FormControl;
  documentType!: FormControl;
  documentNumber!: FormControl;
  email!: FormControl;
  password!: FormControl;
  modifyForm!: FormGroup;

  constructor(
    private readonly crudSrv: Crud,
    private readonly uidSrv: GlobalItems,
    private readonly authSrv: Auth) {this.initForm()}

  ngOnInit() {
    this.showInfo();
  }

  async showInfo(){
    const uid = this.uidSrv.getUid();

    const users = await this.crudSrv.getById('users', uid);

    if (users) {
      const user = users[0];

      this.modifyForm.patchValue({
        name: user.name || '',
        lastName: user.lastName || '',
        documentType: user.documentType || '',
        documentNumber: user.documentNumber || '',
        email: user.email || '',
        password: user.password || '',
      });

    }

  }

    private initForm(){
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.documentType = new FormControl('', [Validators.required]);
    this.documentNumber = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.modifyForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      email: this.email,
      password: this.password,
    });
  }

  async modifyUser(){
    const uid = await this.uidSrv.getUid();
    await this.crudSrv.modify('users', uid, this.modifyForm.value)
  }

  async deleteUser(){
    const uid = await this.uidSrv.getUid();
    await this.crudSrv.delete('users', uid);

    const hola = this.authSrv.deleteAuth();
    console.log(hola);

  }

  async logOut(){
   await this.authSrv.logOut();

   const hola = await this.authSrv.getCurrentUser();
    console.log(hola);

  }

}
