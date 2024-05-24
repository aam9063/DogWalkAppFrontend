import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BuscarComponent } from './buscar/buscar.component';
import { LoginComponent } from '../usuario/login/login.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ModalUsuarioComponent } from '../usuario/modal-usuario/modal-usuario.component';
import { CuidadorComponent } from './cuidador/cuidador.component';
import { OpinionComponent } from './opinion/opinion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DudaComponent } from './duda/duda.component';
import { ListadoUsuarioComponent } from '../usuario/listado-usuario/listado-usuario.component';
import { HorarioComponent } from './horario/horario.component';
import { RecuperarComponent } from '../usuario/recuperar/recuperar.component';
import { RrssComponent } from './rrss/rrss.component';
import { BlogComponent } from './blog/blog.component';
import { PerfilComponent } from '../usuario/perfil/perfil.component';
import { PrecioComponent } from './precio/precio.component';
import { authGuard } from '../_guards/auth.guard';



const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: BuscarComponent, pathMatch: 'full' },
      { path: 'servicio', component: ServicioComponent, pathMatch: 'full'},
      { path: 'cuidador', component: CuidadorComponent, pathMatch: 'full'},
      { path: 'opinion', component: OpinionComponent, pathMatch: 'full'},
      { path: 'duda', component: DudaComponent, pathMatch: 'full'},
      { path: 'contacto', component: ContactoComponent, pathMatch: 'full'},
      { path: 'modal-usuario', component: ModalUsuarioComponent},
      { path: 'perfil', component: PerfilComponent, canActivate: [authGuard]},
      { path: 'listado-usuario', component: ListadoUsuarioComponent},
      { path: 'horario', component: HorarioComponent},
      { path: 'rrss', component: RrssComponent},
      { path: 'blog', component: BlogComponent},
      { path: 'precio', component: PrecioComponent},
      { path: 'recuperar', component: RecuperarComponent},
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
