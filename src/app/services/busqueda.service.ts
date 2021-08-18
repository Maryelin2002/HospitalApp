import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospitales.model';
import { Usuario } from '../models/usuarios.models';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  public base_url = environment.base_url;
  
  constructor(private http: HttpClient) { }

  get Token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDlmZGViN2ZlOWVlNjFjZjQ0MWExYTkiLCJpYXQiOjE2MjM4MDA2Njh9.2oIC0fnXx7R_OrdM457vsJwXdHu3vTXjzwAFzIykvUQ"
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): any[]{

    return resultados.map(  
      user => new Usuario(user.nombre,user.email,'', user.imagen, user.google, user.role, user.uid ) 
      );

  }

  private transformarHospitales( resultados: any[] ): any[]{
    return resultados.map(
      hospital => new Hospital(hospital.nombre, hospital._id, hospital.imagen )
    )
  }

  private transformarMedicos( resultados: any[] ): any[]{
      return resultados;
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ){

    return this.http.get<any[]>(`${this.base_url}/todo/coleccion/${ tipo }/${ termino }`, this.headers )
                .pipe(
                  map( (resp:any) => {
                    switch (tipo) {
                      case 'usuarios':
                        return this.transformarUsuarios( resp.resultados );
                        break;

                      case 'hospitales':
                        return this.transformarHospitales( resp.resultados );
                        break;

                      case 'medicos':
                        return this.transformarMedicos( resp.resultados );
                        break;
                    
                      default:
                        return [];
                    }
                  })
                )
  }
}
