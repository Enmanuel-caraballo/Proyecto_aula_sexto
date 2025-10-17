import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalItems {
  private uidUser: string = '';

  public setUid(uid: string){
    this.uidUser = uid;
  }

  public getUid(): string{
    return this.uidUser;
  }
}
