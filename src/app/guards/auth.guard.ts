import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuarios.models';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private servicio: UsuariosService, private router: Router ){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.servicio.validarToken().pipe(
      tap( isAuth => {
        if( !isAuth ){
          // this.router.navigateByUrl('/login');
        }
      })
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.servicio.validarToken().pipe(
        tap( isAuth => {
          if( !isAuth ){
            // this.router.navigateByUrl('/login');
          }
        })
      );

      //console.log('Paso por el activated del guard');

    //return true;
  }
  
}
