import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { LayoutComponent } from './compartido/layout/layout.component';
import { BuscarComponent } from './compartido/buscar/buscar.component';
import { ServicioComponent } from './compartido/servicio/servicio.component';
import { ModalUsuarioComponent } from './usuario/modal-usuario/modal-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },

  {
    path: 'buscar',
    component: BuscarComponent,
    pathMatch: 'full',
  },
  {
    path: 'servicio',
    component: ServicioComponent,
    pathMatch: 'full',
  },
  {
    path: 'modal-usuario',
    component: ModalUsuarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'layout', // layout/dashboard , layout/especialidades
    loadChildren: () =>
      import('./compartido/compartido.module').then((m) => m.CompartidoModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
