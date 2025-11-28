import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/core/providers/auth/auth';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;
  loginError: string = '';

  constructor(private readonly authSrv: Auth, private readonly toast: ToastService) {
    this.initForm();
   }

  ngOnInit() {
  }

  async onLogin(){
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = 'Debes llenar todos los campos.';
      await this.toast.error(this.loginError);
      return;
    }

    const ok = await this.authSrv.login(this.email.value, this.password.value);
    if (ok) {
      this.loginError = '';
      await this.toast.success('Inicio de sesión exitoso');
    } else {
      this.loginError = 'Usuario o contraseña incorrecta.';
      await this.toast.error(this.loginError);
    }
  }

  private initForm(){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    })
  }


}
