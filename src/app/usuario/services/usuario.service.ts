import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import { LoginUsuario } from '../Interfaces/login';
import { SesionUsuario } from '../Interfaces/sesion';
import { Registro } from '../Interfaces/registro';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { Usuario } from '../Interfaces/usuario';
import { Recuperar } from '../Interfaces/recuperar'; // Asegúrate de importar el modelo Recuperar desde la ubicación correcta
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UsuarioRegistrado } from '../Interfaces/registrado';
import { ActUsuario } from '../Interfaces/ActUsuario';

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

  registrar(request: Registro): Observable<SesionUsuario> {
    console.log('Solicitud de registro:', request);
    return this.http.post<SesionUsuario>(`${this.baseUrl}registro`, request)
  }

  actualizarUsuario(usuario: ActUsuario): Observable<ActUsuario> {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Crea los headers con el token

    return this.http.put<ActUsuario>(`${this.baseUrl}usuarios/${usuario.email}`, usuario, { headers });
  }


  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}usuarios`);
  }

  lista(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl}`);
  }

  /*
  listadoRoles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}listadoRoles`);
  }
  */

  enviarEmail(email: string) {
    console.log('Enviando email:', email);
    const datos: Recuperar = {
      email: email ?? ''
    };
    return this.http.post(`${this.baseUrl}recuperar-contrasenya`, datos).pipe(
      tap(_ => console.log('Respuesta del servidor:', _)),
      catchError(error => {
        console.error('Error al enviar el email:', error);
        throw error;
      })
    );
  }
}
