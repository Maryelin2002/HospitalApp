import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HospitalesPageRoutingModule } from './hospitales-routing.module';

import { HospitalesPage } from './hospitales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HospitalesPageRoutingModule
  ],
  declarations: []
})
export class HospitalesPageModule {}
