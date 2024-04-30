import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { CompartidoService } from 'src/app/compartido/compartido.service';
import { SesionUsuario } from '../Interfaces/sesion';
import { Registro } from '../Interfaces/registro';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent {
  formRegistro: FormGroup;
  ocultarPassword: boolean = true;
  motrarLoading: boolean = false;

  constructor(

              private fb: FormBuilder,
              private router: Router,
              private usuarioServicio: UsuarioService,
              private compartidoServicio: CompartidoService){

    this.formRegistro = this.fb.group({
      dniUsuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      telefonoUsuario: ['', Validators.required]
    })

  }

  registrarUsuario() {
    if (this.formRegistro.valid) {
      this.motrarLoading = true;
      this.usuarioServicio.registrar(this.formRegistro.value).subscribe({
        next: (response: Registro) => {
          console.log('Usuario registrado con éxito', response);
          this.compartidoServicio.mostrarAlerta('Usuario registrado con éxito', 'succes');
          this.motrarLoading = false;
          this.router.navigate(['/layout']);
        },
        error: error => {
          console.error('Hubo un error al registrar el usuario', error);
          this.compartidoServicio.mostrarAlerta('Hubo un error al registrar el usuario', 'error');
          this.motrarLoading = false;
        }
      });
    } else {
      console.log('Formulario no válido');
      this.compartidoServicio.mostrarAlerta('Formulario no válido', 'error');
    }
  }

}
