import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { UsuarioService } from './services/usuario.service';
import { LoginComponent } from './login/login.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    ModalUsuarioComponent,
    ListadoUsuarioComponent,
    RecuperarComponent
  ],
  imports: [
    CommonModule, CompartidoModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    LoginComponent, ModalUsuarioComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
