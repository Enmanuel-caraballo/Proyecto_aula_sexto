import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsS {

  constructor(private readonly http: HttpClient){}

  public getMenu(): Observable<any>{
    return this.http.get('../assets/config/docOpts.json')
  }
}
