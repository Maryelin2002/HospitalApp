import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public imgUrl = '';
  public usuario: Usuario;
  
  constructor(private servicio: UsuariosService) {
    this.usuario = this.servicio.usuario;
   }

  ngOnInit() {
    console.log(this.usuario);
  }

}
