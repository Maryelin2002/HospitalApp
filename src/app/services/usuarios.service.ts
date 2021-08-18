import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuarios.models';
import { map, catchError, tap, delay } from 'rxjs/operators'
import { RegisterForm } from '../interfaces/register.interface';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';
import { LoginForm } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public usuario: Usuario;

  public base_url = environment.base_url;

  constructor(private http: HttpClient) { }

  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.Token
      }
    }
  }

  guardarLocalStorage( token: string, menu: any){
    localStorage.setItem('token',token);
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  validarToken(): Observable<boolean>{
    
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.Token
      }
    }).pipe(
      map( (resp: any) => {

        const {email,google,nombre,imagen = '',role,uid} = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', imagen, google, role, uid);

        //this.usuario.ImprimirUsuario();
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),
      catchError( error => of(false) )
    )
  }


  
  login( formData: LoginForm){
    return this.http.post(`${ this.base_url}/login`,formData)
                    .pipe(
                      tap( (resp: any) => {
                        this.guardarLocalStorage(resp.token,resp.menu);
                      })
                    );
  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${this.base_url}/usuarios`,formData) 
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token',resp.token)
      })
    );

  }

  actualizarPerfil( data: {email: string, nombre: string, role: string} ){

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${this.base_url}/usuarios/${ this.uid }`,data, this.headers )
  }

  cargarUsuario(){
    return this.http.get<CargarUsuario>(`${this.base_url}/usuarios`, this.headers )
                .pipe(
                  delay(500),
                  map( resp => {
                    const usuarios = resp.usuarios.map( 
                      user => new Usuario(user.nombre,user.email,'', user.imagen, user.google, user.role, user.uid )
                      )
                    return {
                      usuarios,
                      totalUsuarios: resp.totalUsuarios
                    }
                  })
                )
  
  }

  eliminarUsuario( usuario: Usuario ){
    return this.http.delete(`${ this.base_url }/usuarios/${ usuario.uid }`,this.headers);
  }
  
  guardarUsuario( usuario: Usuario){
  
    return this.http.put(`${this.base_url}/usuarios/${ usuario.uid }`,usuario, this.headers );
  
  }



  async actualizarFoto( archivo: File, tipo: 'Usuarios'|'Medicos'|'Hospitales', id: string){

    try{

      const url = `${ this.base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen',archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })


      const data = await resp.json();

      if( data.ok ){
        return data.nombreArchivo;
      }else{
        console.log(data.msg);
        return false;
      }


    }catch( error ){
      return false;
    }
  }

}
