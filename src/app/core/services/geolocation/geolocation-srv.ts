import { Injectable, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationSrv{

  public async getGeo(){
    const {coords} = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true, });

      const cordenadas = {
        latitude: coords.latitude,
        longitude: coords.longitude
      }

      return cordenadas;

  }

}
