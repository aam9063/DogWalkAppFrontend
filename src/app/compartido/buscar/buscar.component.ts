import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { CompartidoService } from '../compartido.service';
import { Observable, of } from 'rxjs';
import { PaseadorService } from 'src/app/paseador/services/paseador.service';
import { ApiResponse } from 'src/app/interfaces/api-response';


interface Marker {
  lat: number;
  lng: number;
  nombre?: string; // El nombre es opcional porque inicialmente no lo tenemos
}

interface Paseador{
  nombre: string;
  email: string;
  telefonoPaseador: string;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})

export class BuscarComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'lat', 'lng'];
  dataSource: Marker[] = [];
  paseadores: Paseador[] = [];
  selectedMarker?: string;
  center = {lat: 0, lng: 0}; // Añadido
  markers: Marker[] = []; // Añadido
  sliderValue = 1;
  currentIndex = 0;

  constructor(private router: Router, private compartidoService: CompartidoService, private paseadorService: PaseadorService) { }

  ngOnInit() {
    this.obtenerPaseadores()
    this.obtenerPaseador()


  }

  obtenerPaseadores() {
    this.paseadorService.lista().pipe(
      map((response: ApiResponse) => {
        console.log('Nombres:', response);
        return response.resultado || [];
      }),
      switchMap(nombres => {
        this.paseadores = nombres;
        return this.paseadorService.getUbicaciones().pipe(
          map(response => {
            console.log('Ubicaciones:', response);
            return response || [];
          })
        );
      }),
      map(ubicaciones => {
        return ubicaciones.map((ubicacion, index) => ({
          lat: ubicacion.latitud,
          lng: ubicacion.longitud,
          nombre: this.paseadores[index]?.nombre
        }));
      })
    ).subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.dataSource = data;
          this.markers = data; // Añadido
          this.center = this.markers[0]; // Añadido
        } else {
          this.compartidoService.mostrarAlerta('No se encontraron datos', 'Advertencia!');
        }
      },
      error: (e) => {
        this.compartidoService.mostrarAlerta(e.error.mensaje, 'Error!');
      },
    });
  }

  onMarkerClick(marker: any) {
    this.selectedMarker = marker.nombre;
  }

  buscarUbicaciones() {
    this.obtenerPaseadores();
  }

  obtenerPaseador() {
    this.paseadorService.obtenerPaseadores().subscribe(paseadores => {
      this.paseadores = paseadores;
    });
  }

  cambiarValor(event: any) {
    this.sliderValue = event.value;
  }

  nextCard() {
    if (this.currentIndex < this.paseadores.length - 1) {
      this.currentIndex++;
    }
  }

  previousCard() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
