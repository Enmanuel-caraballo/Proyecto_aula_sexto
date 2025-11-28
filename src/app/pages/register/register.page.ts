import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  name!: FormControl;
  lastName!: FormControl;
  documentType!: FormControl;
  documentNumber!: FormControl;
  email!: FormControl;
  password!: FormControl;
  registerForm!: FormGroup;
  registerSuccess: boolean = false;
  registerError: string = '';

  constructor(private readonly userSrv: User, private readonly toast: ToastService) {
    this.initForm();
  }

  ngOnInit() {
  }

  async doRegister(){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.registerError = 'Debes llenar todos los campos.';
      this.registerSuccess = false;
      await this.toast.error(this.registerError);
      return;
    }

    try {
      console.log(this.registerForm.value);
      await this.userSrv.create(this.registerForm.value);
      this.registerSuccess = true;
      this.registerError = '';
      await this.toast.success('Registro exitoso');
    } catch (e:any) {
      this.registerError = e?.message || 'Error en el registro.';
      this.registerSuccess = false;
      await this.toast.error(this.registerError);
    }
  }


  private initForm(){
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.documentType = new FormControl('', [Validators.required]);
    this.documentNumber = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      documentType: this.documentType,
      documentNumber: this.documentNumber,
      email: this.email,
      password: this.password,
    });
  }
}
