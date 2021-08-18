import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuarios.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public profileForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = '';
  
  constructor(private fb: FormBuilder, private usuarioService: UsuariosService) { 

    this.usuario = usuarioService.usuario;

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre,Validators.required],
      email: [this.usuario.email,[Validators.required, Validators.email]]
    });

    console.log(this.profileForm.get('nombre').value);
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil( this.profileForm.value )
                        .subscribe( () => {
                          const { nombre, email } = this.profileForm.value;
                           this.usuario.nombre = nombre;
                           this.usuario.email = email;
                           console.log(this.usuario);
                           //Swal.fire('Excelente','Usuario actualizado exitosamente','success')
                        }, (error) => {
                          //Swal.fire('Lo sentimos',error.error.msg,'error')
                        })
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if( !file ){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    
  }

  subirImagen(){
    
    this.usuarioService.actualizarFoto( this.imagenSubir, 'Usuarios', this.usuario.uid )
        .then( img => {
          this.usuario.imagen = img;
        }).catch( error => {
        })     
  }

}
