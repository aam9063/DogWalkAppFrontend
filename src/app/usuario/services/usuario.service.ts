import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import { LoginUsuario } from '../Interfaces/login';
import { SesionUsuario } from '../Interfaces/sesion';
import { Registro } from '../Interfaces/registro';
import { ApiResponse } from 'src/app/interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  baseUrl: string = enviroment.apiUrl + 'Usuario/';

  constructor(private http: HttpClient) { }

  iniciarSesion(request: LoginUsuario): Observable<SesionUsuario> {
    return this.http.post<SesionUsuario>(`${this.baseUrl}login`, request).pipe(
      tap(response => {
        // Almacena el token en localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  registrar(request: Registro): Observable<Registro> {
    return this.http.post<Registro>(`${this.baseUrl}registro`, request);
  }


}

