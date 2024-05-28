import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionUsuario } from '../usuario/Interfaces/sesion'
import { SesionPaseador } from '../paseador/interfaces/sesion-paseador';
import { Registro } from '../usuario/Interfaces/registro';
import { Opinion } from './interfaces/opinion';
import { Perro } from './interfaces/perro';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { Paseador } from './interfaces/paseador';
import { Servicio } from './interfaces/servicio';
import { Horario } from './interfaces/horario';
import { Precio } from './interfaces/precio';
import { RankingPerro } from './interfaces/RankingPerro';
import { CrearOpiPerro } from './interfaces/CrearOpiPerro';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  baseUrl: string = enviroment.apiUrl + 'Ranking/';
  baseUrl2: string = enviroment.apiUrl + 'Perro/';
  baseUrl3: string = enviroment.apiUrl + 'Paseador/';
  baseUrl4: string = enviroment.apiUrl + 'Servicio/';
  baseUrl5: string = enviroment.apiUrl + 'Horario/';
  baseUrl6: string = enviroment.apiUrl + 'Precio/';
  baseUrl7: string = enviroment.apiUrl + 'Opinion/';


  constructor(private _snackBar: MatSnackBar,
              private http: HttpClient
  ) { }

  obtenerPaseadores(): Observable<Paseador[]> {
    return this.http.get<Paseador[]>(`${this.baseUrl3}paseadores`);
  }

  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl4}servicios`);
  }

  obtenerHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl5}horarios`);
  }

  obtenerPerros(): Observable<Perro[]> {
    return this.http.get<Perro[]>(`${this.baseUrl2}perrosdto`);
  }

  obtenerRankings(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(`${this.baseUrl}rankings`);
  }

  obtenerPrecios(): Observable<Precio[]> {
    return this.http.get<Precio[]>(`${this.baseUrl6}precios`);
  }

  obtenerOpiniones(): Observable<RankingPerro[]> {
    return this.http.get<RankingPerro[]>(`${this.baseUrl7}opiniones`);
  }

  crearOpPerro(opPerro: CrearOpiPerro): Observable<CrearOpiPerro> {
    return this.http.post<CrearOpiPerro>(`${this.baseUrl7}opiniones/crear`, opPerro);
  }

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
