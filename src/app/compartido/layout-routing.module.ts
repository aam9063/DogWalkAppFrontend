import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BuscarComponent } from './buscar/buscar.component';
import { LoginComponent } from '../usuario/login/login.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ModalUsuarioComponent } from '../usuario/modal-usuario/modal-usuario.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: BuscarComponent, pathMatch: 'full' },
      { path: 'servicio', component: ServicioComponent, pathMatch: 'full'},
      { path: 'modal-usuario', component: ModalUsuarioComponent},
      { path: '**', redirectTo: '', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class LayoutRoutingModule { }
