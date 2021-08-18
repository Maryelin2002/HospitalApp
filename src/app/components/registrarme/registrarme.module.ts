import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarmePageRoutingModule } from './registrarme-routing.module';

import { RegistrarmePage } from './registrarme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarmePageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [RegistrarmePage]
})
export class RegistrarmePageModule {}
