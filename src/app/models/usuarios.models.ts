import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public imagen?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string
    ){}


   get imagenUrl() {

       if( !this.imagen ){
        return `${base_url}/upload/Usuarios/no-image`;

       }
       else if( this.imagen.includes('https') )
       {

           return this.imagen;

       }
       else if( this.imagen )
       {
        return `${base_url}/upload/Usuarios/${ this.imagen }`;
       }
       else{
        return `${base_url}/upload/Usuarios/no-image`;
       }

   }

}