import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { LoginComponent } from '../usuario/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, CompartidoModule
  ],
  exports: [
    LoginComponent
  ],
})
export class PaseadorModule { }
