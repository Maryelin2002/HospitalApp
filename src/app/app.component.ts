import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HomePage } from './components/home/home.page';
import { AuthGuard } from './guards/auth.guard';
import { Usuario } from './models/usuarios.models';
import { UsuariosService } from './services/usuarios.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public imgUrl = '';
  public usuario: Usuario;
  public home: HomePage;

  constructor(private router: Router, private servicio: UsuariosService, private guard: AuthGuard) {
    //this.imgUrl = this.servicio.usuario.imagenUrl;
  }

  ngOnInit(){
  }

  Logout(){
    this.router.navigateByUrl("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("menu");
  }

  Perfil(){
    this.router.navigateByUrl("/perfil");
  }

  
}
