import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Crud } from 'src/app/core/providers/crudFireBase/crud';
import { GlobalItems } from '../../core/providers/global/global-items';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserCreate } from 'src/app/interfaces/user.interface';
import { Auth } from 'src/app/core/providers/auth/auth';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-setting.page.html',
  styleUrls: ['./user-setting.page.scss'],
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
  modifySuccess: boolean = false;
  modifyError: string = '';
  logoutSuccess: boolean = false;
  logoutError: string = '';

  constructor(
    private readonly crudSrv: Crud,
    private readonly uidSrv: GlobalItems,
    private readonly authSrv: Auth,
    private readonly toast: ToastService,
    private readonly alertController: AlertController,
    private readonly router: Router) {this.initForm()}

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
    if (this.modifyForm.invalid) {
      this.modifyForm.markAllAsTouched();
      this.modifyError = 'Debes llenar todos los campos.';
      this.modifySuccess = false;
      await this.toast.error(this.modifyError);
      return;
    }
    try {
      const uid = await this.uidSrv.getUid();
      await this.crudSrv.modify('users', uid, this.modifyForm.value)
      this.modifySuccess = true;
      this.modifyError = '';
      await this.toast.success('Datos modificados correctamente');
    } catch(e:any){
      this.modifyError = e?.message || 'Error al modificar.';
      this.modifySuccess = false;
      await this.toast.error(this.modifyError);
    }
  }

  async confirmDeleteUser(){
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: 'No podrás revertir esta acción.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          role: 'confirm',
          cssClass: 'danger',
          handler: async () => {
            await this.performDeleteUser();
          }
        }
      ]
    });

    await alert.present();
  }

  private async performDeleteUser(){
    try{
      const uid = await this.uidSrv.getUid();
      await this.crudSrv.delete('users', uid);
      await this.authSrv.deleteAuth();
      await this.toast.success('Cuenta eliminada correctamente');
      await this.router.navigate(['/home']);
    }catch(e:any){
      const msg = e?.message || 'Error al eliminar la cuenta.';
      await this.toast.error(msg);
    }
  }

  async logOut(){
    try {
      await this.authSrv.logOut();
      this.logoutSuccess = true;
      this.logoutError = '';
      await this.toast.success('Sesión cerrada correctamente');
    } catch(e:any){
      this.logoutError = e?.message || 'Error al cerrar sesión.';
      this.logoutSuccess = false;
      await this.toast.error(this.logoutError);
    }

  }

}
