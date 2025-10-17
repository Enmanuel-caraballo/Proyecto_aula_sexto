import { Injectable } from '@angular/core';
import { collection } from '@angular/fire/firestore';
import { Auth } from 'src/app/core/providers/auth/auth';
import { Crud } from 'src/app/core/providers/crudFireBase/crud';
import { IUserCreate } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private readonly authSrv: Auth, private readonly crudSrv: Crud){}

  async create(user: IUserCreate): Promise<void>{
    try {
      console.log(user);
      const uid = await this.authSrv.register(user.email, user.password);
      await this.crudSrv.create("users", {
        uid,
        name: user.name,
        lastName: user.lastName,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        email: user.email,
        password: user.password,

      }, uid);

      console.log("Create worksss wiiii");


    } catch (error) {
      console.log(error);

    }
  }

  async modify(uid: string, user: IUserCreate){
    await this.crudSrv.modify('users', uid, {
        name: user.name,
        lastName: user.lastName,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        email: user.email,
        password: user.password,
    });
  }

}
