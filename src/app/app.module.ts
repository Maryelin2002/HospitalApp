import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosPage } from './components/usuarios/usuarios.page';
import { MedicosPage } from './components/medicos/medicos.page';
import { ImagenPipe } from './pipes/imagen.pipe';
import { HospitalesPage } from './components/hospitales/hospitales.page';

@NgModule({
  declarations: [AppComponent, UsuariosPage,MedicosPage, ImagenPipe, HospitalesPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
