import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { LoginUsuario } from '../Interfaces/login';
import { PaseadorService } from 'src/app/paseador/services/paseador.service';
import { LoginPaseador } from 'src/app/paseador/interfaces/login-paseador';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuarioServicio: UsuarioService,
              private paseadorServicio: PaseadorService,
              private compartidoServicio: CompartidoService){

    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  iniciarSesion(){
    this.mostrarLoading = true;
    const request: LoginUsuario = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };
    this.usuarioServicio.iniciarSesion(request).subscribe({
      next: (response) => {
        this.compartidoServicio.guardarSesion(response);
        alert('Bienvenido')
        this.router.navigate(['layout']);

      },
      complete: () => {
        this.mostrarLoading = true;
      },
      error: (error) => {
        this.compartidoServicio.mostrarAlerta(error.error, 'Error');
        this.mostrarLoading = false;
      }
    })
  }

  iniciarSesionPaseador(){
    this.mostrarLoading = true;
    const request: LoginPaseador = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
    };
    this.paseadorServicio.iniciarSesionPaseador(request).subscribe({
      next: (response) => {
        this.compartidoServicio.guardarSesionPaseador(response);
        this.router.navigate(['layout']);

      },
      complete: () => {
        this.mostrarLoading = true;
      },
      error: (error) => {
        this.compartidoServicio.mostrarAlerta(error.error, 'Error');
        this.mostrarLoading = false;
      }
    })
  }



}


