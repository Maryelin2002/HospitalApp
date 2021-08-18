import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.models';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  public totalUsuarios: number;
  public usuarios: Usuario[] = [];
  public usuario: Usuario;
  public usuariosTemp: Usuario[] = [];
  
  constructor(public alertController: AlertController,
    public service: UsuariosService, private busquedaService: BusquedaService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.service.cargarUsuario().subscribe( ({ totalUsuarios, usuarios}) => {
      this.totalUsuarios = totalUsuarios;
      this.usuarios = usuarios;      
      this.usuariosTemp = usuarios;    
    })
  }

  buscar( termino: string ){

    if( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios',termino)
                      .subscribe( resultados => {
                        this.usuarios = resultados
                      })
  }


  async eliminarUsuario( usuario: Usuario ){

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Eliminar usuario',
        message: `Esta a punto de borrar a ${ usuario.nombre }`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Confirmar',
            handler: () => {
              this.service.eliminarUsuario(usuario).subscribe( resp => {
                this.cargarUsuarios();
              })
            }
          }
        ]
      });
  
      await alert.present();


    // if( usuario.uid === this.usuarioService.uid ){
    //   return Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
    // }

 
    // Swal.fire({
    //   title: 'Esta seguro?',
    //   text: `Esta a punto de borrar a ${ usuario.nombre }`,
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonText: 'Si, borrarlo',
    //   cancelButtonText: 'No, cancelar',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     this.usuarioService.eliminarUsuario( usuario )
    //                       .subscribe( resp => {

    //                         this.cargarUsuarios();

    //                          Swal.fire(
    //                         'Excelente',
    //                         `${ usuario.nombre } fue eliminado correctamente`,
    //                         'success'
    //                       );                          
    //                       })

       
    //   } else if (
    //     /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     Swal.fire(
    //       'Cancelado',
    //       'No se elimino el usuario',
    //       'error'
    //     )
    //   }
    // })
  }


}
