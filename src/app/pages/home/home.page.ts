import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
//declare var google: any;
///<reference types="google.maps" />
import { Geolocation } from '@capacitor/geolocation';
import { GeolocationSrv } from 'src/app/core/services/geolocation/geolocation-srv';
import { ILocation } from 'src/app/interfaces/location.interface';
import { environment } from 'src/environments/environment';

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
  userMarker: any;
  constructor(private readonly geolocationSrv: GeolocationSrv) { }


  async ngAfterViewInit() {

    // ! Cuidado no tocar esto es lo que hace que funcione en movil

    try {

      const resp = await Geolocation.requestPermissions();

      if (resp.location === 'granted' || resp.location === 'prompt') {


      this.coord = await this.geolocationSrv.getGeo();

      //  this.userMarker.setCenter(this.coord.latitude, this.coord.longitude);
      this.geolocationSrv.getRealTimePosition().subscribe(coords => {
      const coord = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }

      this.coord = coord;
      this.updateUserPosition(this.coord);
      this.userMarker.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
    })



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
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.MAPS_API_Key}&libraries=places`;
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



    //this.searchNearbyPlaces();
   this.addInitialMarker(centroInicial);
  }

  updateUserPosition(coords: ILocation) {
    if (!this.map || !this.userMarker) return;

    const newPos = new google.maps.LatLng(coords.latitude, coords.longitude);
    this.userMarker.setPosition(newPos);
    this.map.setCenter(newPos);
  }

  addInitialMarker(position: any) {
    if (this.map) {
     this.userMarker = new google.maps.Marker({
        position: position,
        map: this.map,
        icon: {
          url: 'assets/icon/usuario.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      });
    }
  }

  searchNearbyPlaces() {
    if (!this.map || !google.maps.places) {
      console.log('API de places no doesnt work');
      return;
    }

    const service = new google.maps.places.PlacesService(this.map);

    const request = {
      location: this.map.getCenter(),
      radius: 1000,
      type: 'restaurant'
      // type: 'tourist_attraction'
    };

    service.nearbySearch(request, (results: any, status: any) => {

      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i])
        }
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        console.log('No se encontraron resultados cercanos');
      } else {
        console.error('Error en la busqueda de places', status);

      }
    });
  }

  createMarker(place: any) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      title: place.name,
    });

    // const marker = new google.maps.marker.AdvancedMarkerElement({
    //   map: this.map,
    //   position: place.geometry.location,
    //   title: place.name,
    // });

    const infoWindow = new google.maps.InfoWindow({
      content: `<div><strong>${place.name}</strong><br>${place.vicinity}</div>`
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    return marker;
  }
}


