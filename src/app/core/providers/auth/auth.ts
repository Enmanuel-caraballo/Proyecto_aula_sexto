import { Injectable } from '@angular/core';
import { Auth as AuthFirebase, createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalItems } from '../global/global-items';


@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(
    private readonly authFirebase: AuthFirebase,
    private readonly router: Router,
    private readonly globalSrv: GlobalItems
  ){}

  async register(email: string, password: string){
    const resp = await createUserWithEmailAndPassword(this.authFirebase, email, password);
    console.log(resp);
    return resp.user.uid;
  }

  async login(email: string, password: string){
    try {
      const resp = await signInWithEmailAndPassword(this.authFirebase, email, password);
      if (resp) {
        this.router.navigate(['/home']);
      }
      console.log(resp);

    } catch (error) {
      console.log((error as any).message);

    }
  }

  async logOut(){
    try {
      await signOut(this.authFirebase);
    } catch (error) {
      console.log((error as any).message);

    }
  }


  async getCurrentUser(){
      const auth = getAuth();
      const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      this.globalSrv.setUid(uid);
      this.router.navigate(['/user-setting'])

    }else{
      console.log("No hay usuario logeado");
      this.router.navigate(['/login'])
  }
}

  async deleteAuth(){
    try {
      const user = this.authFirebase.currentUser;
      console.log(user);

      if (user) {
        const resp = await deleteUser(user);
        console.log('Deleted: ', user);
        return resp;


      }else{
        console.log('Error al eliminar');
      }

    } catch (error) {

      console.log('Error al eliminar', error);


    }



  }

}
