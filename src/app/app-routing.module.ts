import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './usuario/login/login.component';
import { LayoutComponent } from './compartido/layout/layout.component';
import { BuscarComponent } from './compartido/buscar/buscar.component';
import { ServicioComponent } from './compartido/servicio/servicio.component';
import { ModalUsuarioComponent } from './usuario/modal-usuario/modal-usuario.component';
import { ListadoUsuarioComponent } from './usuario/listado-usuario/listado-usuario.component';
import { HorarioComponent } from './compartido/horario/horario.component';
import { RecuperarComponent } from './usuario/recuperar/recuperar.component';
import { RrssComponent } from './compartido/rrss/rrss.component';
import { BlogComponent } from './compartido/blog/blog.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { PrecioComponent } from './compartido/precio/precio.component';

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
    path: 'perfil',
    component: PerfilComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: ListadoUsuarioComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HorarioComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: RrssComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: BlogComponent,
    pathMatch: 'full',
  },
  {
    path: 'precio',
    component: PrecioComponent,
    pathMatch: 'full',
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
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
