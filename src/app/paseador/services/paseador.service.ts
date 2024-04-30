import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import { LoginPaseador } from '../interfaces/login-paseador';
import { SesionPaseador } from '../interfaces/sesion-paseador';
import { ApiResponse } from 'src/app/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class PaseadorService {

  baseUrl: string = enviroment.apiUrl + 'Paseador/';

  constructor(private http: HttpClient) { }

  iniciarSesionPaseador(request: LoginPaseador): Observable<SesionPaseador> {
    return this.http.post<SesionPaseador>(`${this.baseUrl}login paseadores`, request).pipe(
      tap(response => {
        // Almacena el token en localStorage
        localStorage.setItem('tokenPaseador', response.tokenPaseador);
      })
    );
  }

  lista(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}paseadores/nombres`);
  }

  getNombres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}paseadores/nombres`);
  }

  getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}paseadores/ubicaciones`);
  }
}
