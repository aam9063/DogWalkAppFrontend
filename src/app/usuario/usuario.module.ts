import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { UsuarioService } from './services/usuario.service';
import { LoginComponent } from './login/login.component';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';



@NgModule({
  declarations: [
    LoginComponent,
    ModalUsuarioComponent
  ],
  imports: [
    CommonModule, CompartidoModule
  ],
  exports: [
    LoginComponent, ModalUsuarioComponent
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
