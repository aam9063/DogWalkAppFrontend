import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionUsuario } from '../usuario/Interfaces/sesion'
import { SesionPaseador } from '../paseador/interfaces/sesion-paseador';
import { Registro } from '../usuario/Interfaces/registro';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  constructor(private _snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string){
    this._snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition:"top",
      duration:3000
    })
  }

  guardarSesion(sesion: SesionUsuario) {
      localStorage.setItem("usuarioSesion",JSON.stringify(sesion.email));


  }

  guardarSesionPaseador(sesion: SesionPaseador) {
      localStorage.setItem("paseadorSesion", JSON.stringify(sesion.emailPaseador));
  }

  obtenerSesion() {
    const sesionString = localStorage.getItem("usuarioSesion");
    const usuarioToken = JSON.parse(sesionString!);
    return usuarioToken;
  }

  obtenerSesionPaseador() {
    const sesionPaseadorString = localStorage.getItem("paseadorSesion");
    const tokenPaseador = JSON.parse(sesionPaseadorString!);
    return tokenPaseador;
  }


  eliminarSesion(){
    localStorage.removeItem("usuarioSesion");
    localStorage.removeItem("token");
  }

  eliminarSesionPaseador() {
    localStorage.removeItem("paseadorSesion");
    localStorage.removeItem("tokenPaseador")
  }

}
