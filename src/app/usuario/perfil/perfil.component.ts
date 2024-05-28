import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { ActUsuario } from '../Interfaces/ActUsuario';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  imagenPerfil: string = '';
  usuario: ActUsuario = {
    dniUsuario: '',
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    password: '',
    telefonoUsuario: ''
  };

  perfilForm = new FormGroup({
    dniUsuario: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    direccion: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    telefonoUsuario: new FormControl('')
  });

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    // Inicializa el usuario aquí o recupéralo de alguna parte
    this.usuario = {
      dniUsuario: '',
      nombre: '',
      apellido: '',
      direccion: '',
      email: '',
      password: '',
      telefonoUsuario: ''
    };
  }

  cambiarImagen(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => this.imagenPerfil = (e.target as FileReader).result as string;
      reader.readAsDataURL(target.files[0]);
    }
  }

  actualizarPerfil() {
    const formValues = this.perfilForm.value;
    this.usuario = {
      dniUsuario: formValues.dniUsuario ?? '',
      nombre: formValues.nombre ?? '',
      apellido: formValues.apellido ?? '',
      direccion: formValues.direccion ?? '',
      email: formValues.email ?? '',
      password: formValues.password ?? '',
      telefonoUsuario: formValues.telefonoUsuario ?? ''
    };
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(usuarioActualizado => {
      alert("Perfil actualizado");
      console.log("Perfil actualizado:", usuarioActualizado);
      // Realiza cualquier otra acción necesaria con el usuario actualizado
      console.log(usuarioActualizado);
      // Restablece los valores del formulario
      this.perfilForm.reset();
    });
  }
}
