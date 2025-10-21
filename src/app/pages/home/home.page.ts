import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
declare var google: any;
import { Geolocation } from '@capacitor/geolocation';
import { GeolocationSrv } from 'src/app/core/services/geolocation/geolocation-srv';
import { ILocation } from 'src/app/interfaces/location.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements AfterViewInit {

  @ViewChild('map_canvas', { static: false }) mapElement: ElementRef | undefined;
  map: any;
  coord!: ILocation;
  constructor(private readonly geolocationSrv: GeolocationSrv) { }


  async ngAfterViewInit() {

    // this.coord = await this.geolocationSrv.getGeo();

    // await this.loadGoogleMaps().then(() => {
    //   this.loadMap();
    // }).catch(err => {
    //   console.error('Error cargando Google Maps:', err);
    // });

    try {

      const resp = await Geolocation.requestPermissions();


      if (resp.location === 'granted' || resp.location === 'prompt') {
        this.coord = await this.geolocationSrv.getGeo();

      } else {
        console.log('Permiso denegado');
        return;
      }

      await this.loadGoogleMaps().then(() => {
        this.loadMap();
      }).catch(err => {
        console.error('Error cargando Google Maps:', err);
      });

    } catch (error) {
      console.log("PERMISSSIONS NOT GRANTED", error);

    }



  }


  loadGoogleMaps(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Si ya está cargado, salimos
      if ((window as any).google && (window as any).google.maps) {
        resolve();
        return;
      }

      // etiqueta <script>
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDa2oZbyzPVNxAu1lPCnNgmyf_pvLI1Phw';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = (err) => {
        reject(err);
      };

      document.head.appendChild(script);
    });
  }

  // Inicializa el mapa cuando la API está lista
  loadMap() {
    const mapContainer = document.getElementById('map_canvas');

    if (!mapContainer || !google || !google.maps) {
      console.log('El contenedor o la API no están disponibles');
      return;
    }

    const centroInicial = new google.maps.LatLng(this.coord.latitude, this.coord.longitude);

    const mapOptions = {
      center: centroInicial,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      streetViewControl: true,
      fullscreenControl: true,
      mapTypeControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },

    };

    this.map = new google.maps.Map(mapContainer, mapOptions);
    console.log('Mapa renderizado');

    this.addInitialMarker(centroInicial);
  }

  addInitialMarker(position: any) {
    if (this.map) {
      new google.maps.Marker({
        position: position,
        map: this.map,
      });
    }
  }
}


