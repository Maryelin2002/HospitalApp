import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarmePage } from './registrarme.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarmePageRoutingModule {}
