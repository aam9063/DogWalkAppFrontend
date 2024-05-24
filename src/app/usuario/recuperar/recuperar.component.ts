import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Recuperar } from '../Interfaces/recuperar';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  formRecuperar = new FormGroup({
    email: new FormControl('')
  });

  constructor(private usuarioService: UsuarioService) { } // Inyecta UsuarioService

  enviarEmail() {
    const email = this.formRecuperar.value.email;
    console.log('Email del formulario:', email);
    if (email) { // Comprueba que email no es null ni undefined
      this.usuarioService.enviarEmail(email).subscribe(
        _ => {
          // Maneja la respuesta de tu backend.
          console.log('Email enviado correctamente');
          alert('Email enviado correctamente');
        },
        error => {
          console.error('Hubo un error al enviar el email:', error);
          alert('Hubo un error al enviar el email');
        }
      );
    } else {
      console.error('El email es null o undefined');
    }
  }


}
