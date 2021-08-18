import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medicos.models';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  
  public base_url = environment.base_url;
  
  constructor( private http: HttpClient ) { }

  
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

  cargarMedicos(){
    const url = `${this.base_url}/medicos`;
    return this.http.get(url,this.headers).pipe(
      map( (resp: {ok: boolean, medicos: Medico[]}) => resp.medicos )
    )}

    crearMedicos( medico: { nombre: string , hospital: string } ){
      const url = `${this.base_url}/medicos`;
      return this.http.post( url, medico, this.headers );
    }
  
    actualizarMedicos( medico: Medico ){
      const url = `${this.base_url}/medicos/${ medico._id }`;
      return this.http.put( url, medico, this.headers );
    }
  
    eliminarMedicos( _id: string ){
      const url = `${this.base_url}/medicos/${ _id }`;
      return this.http.delete( url, this.headers );
    }


    obtenerMedicoPorId( id: string ){
      const url = `${this.base_url}/medicos/${ id }`;
      return this.http.get( url, this.headers ).pipe(
        map( (resp: {ok: boolean, medicos: Medico}) => resp.medicos )
      )
    }
}
