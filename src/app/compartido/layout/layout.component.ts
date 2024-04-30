import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CompartidoService } from '../compartido.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  estaLoggeado = false;
  email = '';


  constructor(private router: Router, private compartidoService: CompartidoService) { }

  ngOnInit(): void {
    const usuarioToken = this.compartidoService.obtenerSesion();
    const tokenPaseador = this.compartidoService.obtenerSesionPaseador();
    if(usuarioToken != null) {
      this.estaLoggeado = true;
      this.email = usuarioToken;
    }
    console.log('Peticion completa, el token es:' + usuarioToken);
    if(tokenPaseador != null) {
      this.estaLoggeado = true;
      this.email = tokenPaseador;
    }
  }

  cerrarSesion(): void {
    this.compartidoService.eliminarSesion();
    this.router.navigate(['/layout']);
    this.estaLoggeado = false;
    this.email = '';
  }
}
