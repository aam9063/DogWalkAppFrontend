import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CompartidoService } from '../compartido.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

interface Usuario {
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  estaLoggeado = false;
  email = '';
  usuarios: Usuario[] = [];

  constructor(private router: Router, private compartidoService: CompartidoService, private http: HttpClient,
              private usuarioService: UsuarioService) { }

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

  scrollToTop() {
    window.scrollTo(0, 0);
  }


}
