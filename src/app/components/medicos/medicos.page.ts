import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MedicosService } from 'src/app/services/medicos.service';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Medico } from 'src/app/models/medicos.models';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.page.html',
  styleUrls: ['./medicos.page.scss'],
})
export class MedicosPage implements OnInit {

  public medicos: Medico[] = [];
  
  constructor(public alertController: AlertController,private servicio: MedicosService,
    private busquedaService: BusquedaService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Agregar medico',
      inputs: [
        {
          name: 'nombreMedico',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Guardar',
          handler: (alertData) => {

            const data = {
              nombre: alertData.nombreMedico,
              hospital: "60a457b6820b8621e8bca7ab"
            }

            this.servicio.crearMedicos(data).subscribe( resp => {
              this.cargarMedicos();
            })
          }
        }
      ]
    });

    await alert.present();
  }



  cargarMedicos(){
    this.servicio.cargarMedicos().subscribe( resp => {
      this.medicos = resp;
    })
  }

  buscarMedicos( termino: string ){

    if( termino.length === 0 ){
      return this.cargarMedicos();
    }

    this.busquedaService.buscar('medicos', termino).subscribe( resp => {
      this.medicos = resp;
    })

  }


  async EliminarMedico(medico: Medico){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar usuario',
      message: `Esta a punto de borrar a ${ medico.nombre }`,
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
            this.servicio.eliminarMedicos(medico._id).subscribe( resp => {
              this.cargarMedicos();
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
