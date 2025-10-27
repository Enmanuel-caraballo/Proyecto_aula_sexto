import { Injectable, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';

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


  getRealTimePosition(): Observable<{ latitude: number; longitude: number }> {
  return new Observable((observer) => {
    const watchIdPromise = Geolocation.watchPosition(
      { enableHighAccuracy: true },
      (position, err) => {
        if (err) {
          observer.error(err);
          return;
        }

        if (position) {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        }
      }
    );

    // Cuando el observable se cierra, se limpia el watch
    return () => {
      watchIdPromise.then((id) => {
        Geolocation.clearWatch({ id });
      });
    };
  });
}

  //  async getRealTimePosition(): Promise<{latitude: number; longitude: number}>{
  //    return new Promise(async (resolve, reject) => {

  //    try {
  //      const watchId = await Geolocation.watchPosition(
  //     {enableHighAccuracy: true},
  //     (position, err) =>{
  //       if (err) {
  //           console.log('Error al obtener la posición', err);
  //           return;
  //         }

  //         if(position){
  //           const realTimeCoords = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           }

  //           resolve(realTimeCoords)
  //         }
  //       }
  //     );

  //   } catch (error) {
  //     console.log('Error en wathc positioin',error);

  //     reject(error)

  //   }
  // })
  //  }
}
