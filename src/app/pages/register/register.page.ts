import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';

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

  constructor(private readonly userSrv: User) {
    this.initForm();
  }

  ngOnInit() {
  }

  async doRegister(){
    console.log(this.registerForm.value);
    await this.userSrv.create(this.registerForm.value);
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
