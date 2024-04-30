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

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})

export class BuscarComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'lat', 'lng'];
  dataSource: Marker[] = [];
  paseadores: any[] = [];
  selectedMarker?: string;
  center = {lat: 0, lng: 0}; // Añadido
  markers: Marker[] = []; // Añadido

  constructor(private router: Router, private compartidoService: CompartidoService, private paseadorService: PaseadorService) { }

  ngOnInit() {
    this.obtenerPaseadores();
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
}
