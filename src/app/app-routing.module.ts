import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserGuard } from './guards/user.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { RecuperacionComponent } from './pages/recuperacion/recuperacion.component';
import { FinalizacionComponent } from './pages/finalizacion/finalizacion.component';
import { LectorqrComponent } from './pages/lectorqr/lectorqr.component';

const routes: Routes = [
  {
    path:'encuesta',
    component : EncuestaComponent

  },
  {
    path:'lectorqr',
    component : LectorqrComponent

  },
  {
    path:'recuperacion',
    component : RecuperacionComponent
  },
  {
    path:'finalizacion',
    component : FinalizacionComponent

  },
  {
    path:'',
    component : LoginComponent
  },
  {
    path:'registro',
    component : RegisterComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad : [UserGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
