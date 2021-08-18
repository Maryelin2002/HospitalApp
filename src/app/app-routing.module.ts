import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './components/home/home.page';
import { HospitalesPage } from './components/hospitales/hospitales.page';
import { InicioPage } from './components/inicio/inicio.page'
import { LoginPage } from './components/login/login.page';
import { MedicosPage } from './components/medicos/medicos.page';
import { PerfilPage } from './components/perfil/perfil.page';
import { RegistrarmePage } from './components/registrarme/registrarme.page';
import { UsuariosPage } from './components/usuarios/usuarios.page';
import { FolderPage } from './folder/folder.page';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '',redirectTo: 'principal',pathMatch: 'full'},
  {path: 'folder',component: FolderPage},
  {path: 'principal',component: InicioPage},
  {path: 'home',component: HomePage,canActivate: [ AuthGuard ],canLoad: [ AuthGuard ]},
  {path: 'registro',component: RegistrarmePage},
  {path: 'login',component: LoginPage},
  {path: 'perfil',component: PerfilPage,canActivate: [ AuthGuard ],canLoad: [ AuthGuard ]},
  {path: 'usuarios',component: UsuariosPage},
  {path: 'medicos',component: MedicosPage},
  {path: 'hospitales',component: HospitalesPage},
  {path: '**',redirectTo: 'login',pathMatch: 'full'},
  {path: 'folder/:id',loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)},
  {path: 'registrarme',loadChildren: () => import('./components/registrarme/registrarme.module').then( m => m.RegistrarmePageModule)},
  {path: 'login',loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)},
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./components/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./components/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'medicos',
    loadChildren: () => import('./components/medicos/medicos.module').then( m => m.MedicosPageModule)
  },
  {
    path: 'hospitales',
    loadChildren: () => import('./components/hospitales/hospitales.module').then( m => m.HospitalesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
